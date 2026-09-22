#!/usr/bin/env python3
"""Extract the Tafsir Center 2:197 pilot into Quran Universe coordinates.

Usage:
    python scripts/import_tafsircenter_pilot.py /path/to/quran.db

The script is intentionally read-only. It does not download data and it does not
assume that Tafsir Center segmentation matches any other corpus. It maps the
database's own orthographic wordNo rows to Quran Universe word IDs for 2:197.
"""

from __future__ import annotations

import argparse
import json
import sqlite3
from pathlib import Path

SURAH = 2
AYAH = 197
EXPECTED_WORDS = 29


def canonical_word_id(word_no: int) -> str:
    return f"q:{SURAH}:{AYAH}:w{word_no}"


def extract(db_path: Path) -> list[dict]:
    uri = f"file:{db_path.resolve()}?mode=ro"
    conn = sqlite3.connect(uri, uri=True)
    conn.row_factory = sqlite3.Row
    try:
        rows = conn.execute(
            """
            SELECT
              r.wordNo,
              r.word,
              r.rasm,
              m.meaning,
              i.irabMushakkal,
              s.sarf,
              ws.root,
              ws.repeatitionCount,
              ws.rootRepeatitionCount
            FROM word_content_rasm r
            LEFT JOIN word_content_meaning m
              ON m.surahNo=r.surahNo AND m.ayahNo=r.ayahNo AND m.wordNo=r.wordNo
            LEFT JOIN word_content_irab i
              ON i.surahNo=r.surahNo AND i.ayahNo=r.ayahNo AND i.wordNo=r.wordNo
            LEFT JOIN word_content_sarf s
              ON s.surahNo=r.surahNo AND s.ayahNo=r.ayahNo AND s.wordNo=r.wordNo
            LEFT JOIN word_statistics ws
              ON ws.surahNo=r.surahNo AND ws.ayahNo=r.ayahNo AND ws.wordNo=r.wordNo
            WHERE r.surahNo=? AND r.ayahNo=?
            ORDER BY r.wordNo
            """,
            (SURAH, AYAH),
        ).fetchall()
    finally:
        conn.close()

    if len(rows) != EXPECTED_WORDS:
        raise SystemExit(
            f"Expected {EXPECTED_WORDS} Tafsir Center words for {SURAH}:{AYAH}; found {len(rows)}"
        )

    expected_numbers = list(range(1, EXPECTED_WORDS + 1))
    actual_numbers = [row["wordNo"] for row in rows]
    if actual_numbers != expected_numbers:
        raise SystemExit(
            f"Unexpected word numbering for {SURAH}:{AYAH}: {actual_numbers}"
        )

    output = []
    for row in rows:
        word_no = row["wordNo"]
        output.append(
            {
                "id": canonical_word_id(word_no),
                "external": {
                    "system": "tafsircenter",
                    "surahNo": SURAH,
                    "ayahNo": AYAH,
                    "wordNo": word_no,
                },
                "text": row["word"],
                "rasmNote": None if row["rasm"] in (None, "", "-") else row["rasm"],
                "meaning": row["meaning"],
                "irab": row["irabMushakkal"],
                "sarf": row["sarf"],
                "root": row["root"],
                "frequency": row["repeatitionCount"],
                "rootFrequency": row["rootRepeatitionCount"],
                "verification": {
                    "status": "source_import",
                    "source": "Tafsir Center quran.db",
                },
            }
        )

    return output


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("database", type=Path, help="Path to official Tafsir Center quran.db")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("/tmp/quran-universe-tafsircenter-2-197.json"),
        help="Output JSON path",
    )
    args = parser.parse_args()

    if not args.database.is_file():
        raise SystemExit(f"Database not found: {args.database}")

    rows = extract(args.database)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(
            {
                "source": "tafsircenter",
                "reference": f"{SURAH}:{AYAH}",
                "wordCount": len(rows),
                "words": rows,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(rows)} mapped rows to {args.output}")


if __name__ == "__main__":
    main()
