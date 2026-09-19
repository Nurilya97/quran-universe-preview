Archived Word view from commit 4da310ac05a7a97cd004fb51dc1fbbbff415f2f0.

WordFocusPrototype preserves the complete former overlay, paging helpers, markup and frozen stylesheet. It is not imported by production. To restore it, render WordFocusPrototype with the former WordFocusOverlay props in an isolated preview document with the original global typography. Its CSS is a snapshot of AyahView.css: never import it alongside the production stylesheet.
