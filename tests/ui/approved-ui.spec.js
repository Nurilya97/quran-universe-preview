import { test, expect } from '@playwright/test'

async function openSearch(page, query) {
  await page.goto('spatial.html')
  const input = page.locator('.search-form input')
  await expect(input).toBeVisible()
  await input.fill(query)
  await input.press('Enter')
}

test.describe('approved Quran Universe UI contracts', () => {
  test('taqwā mobile morphology keeps the approved heading-to-heading connector', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openSearch(page, 'taqwa')

    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-structure').click()
    await expect(page.locator('dialog.detail-sheet[open]')).toBeVisible()

    await page.locator('.morph-view-tabs').getByRole('button', { name: 'Схема' }).click()
    const board = page.locator('.morph-board')
    await expect(board).toBeVisible()

    const units = board.locator('.morph-board-flow-unit')
    await expect(units).toHaveCount(4)

    const geometry = await board.evaluate((root) => {
      const first = root.querySelectorAll('.morph-board-flow-unit')[0]
      const second = root.querySelectorAll('.morph-board-flow-unit')[1]
      const line = first?.querySelector('.morph-board-connector-line')
      const firstHeading = first?.querySelector('.morph-board-node-topline')
      const secondHeading = second?.querySelector('.morph-board-node-topline')
      if (!line || !firstHeading || !secondHeading) return null

      const lineRect = line.getBoundingClientRect()
      const firstRect = firstHeading.getBoundingClientRect()
      const secondRect = secondHeading.getBoundingClientRect()
      const lineStyle = getComputedStyle(line)
      const startDot = getComputedStyle(line, '::before')
      const arrow = getComputedStyle(line, '::after')

      return {
        lineWidth: lineStyle.width,
        lineTop: lineRect.top,
        lineBottom: lineRect.bottom,
        firstCenter: firstRect.top + firstRect.height / 2,
        secondCenter: secondRect.top + secondRect.height / 2,
        dotContent: startDot.content,
        dotTop: startDot.top,
        dotWidth: startDot.width,
        arrowContent: arrow.content,
        arrowBottom: arrow.bottom,
      }
    })

    expect(geometry).not.toBeNull()
    expect(geometry.lineWidth).toBe('1px')
    expect(Math.abs(geometry.lineTop - geometry.firstCenter)).toBeLessThanOrEqual(3)
    expect(Math.abs(geometry.lineBottom - geometry.secondCenter)).toBeLessThanOrEqual(4)
    expect(geometry.dotContent).not.toBe('none')
    expect(geometry.dotTop).toBe('0px')
    expect(Number.parseFloat(geometry.dotWidth)).toBeGreaterThan(0)
    expect(geometry.arrowContent).not.toBe('none')
    expect(geometry.arrowBottom).toBe('0px')

    const target = board.locator('.morph-board-target-word')
    await expect(target).toHaveAttribute('lang', 'ar')
    await expect(target).toHaveAttribute('dir', 'rtl')

    await page.screenshot({
      path: testInfo.outputPath('taqwa-mobile-approved.png'),
      fullPage: true,
    })
  })

  test('ل ب ب root space keeps its orbit legend and same-family inner ring', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openSearch(page, 'lbb')

    const rootStage = page.locator('.root-stage-lbb')
    await expect(rootStage).toBeVisible()

    const legend = rootStage.locator('.root-legend')
    await expect(legend).toBeVisible()
    await expect(legend).toContainText('кольцо — семья')
    await expect(legend).toContainText('форма семьи')
    await expect(legend).toContainText('есть в Коране')
    await expect(legend).toContainText('пунктир — доп. зона I семьи')

    await expect(rootStage.locator('.root-orbit-inner')).toHaveCount(1)
    await expect(rootStage.locator('.root-legend-orbit')).toHaveCount(1)
    await expect(rootStage.locator('.root-legend-inner')).toHaveCount(1)

    const rootLabel = rootStage.locator('.root-core h1')
    await expect(rootLabel).toHaveAttribute('lang', 'ar')
    await expect(rootLabel).toHaveAttribute('dir', 'rtl')

    await page.screenshot({
      path: testInfo.outputPath('lbb-root-mobile-approved.png'),
      fullPage: true,
    })
  })



  test('registered Ayah Space record opens from Quran occurrences and renders the shared schema', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await openSearch(page, 'taqwa')

    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-quran').click()
    await expect(page.locator('dialog.detail-sheet[open]')).toBeVisible()

    const reference = page.locator('.quran-reference-grid button.has-prototype').filter({ hasText: '2:197' })
    await expect(reference).toBeEnabled()
    await reference.click()

    const ayah = page.locator('.ayah-space-shell')
    await expect(ayah).toBeVisible()
    await expect(ayah.locator('.analysis-verse-reference > span')).toHaveText('2:197')

    const words = ayah.locator('.analysis-inline-word')
    await expect(words).toHaveCount(29)
    await expect(words.nth(25)).toHaveClass(/is-entry/)
    await expect(words.nth(25)).toContainText('ٱلتَّقْوَىٰ')

    await page.getByRole('tab', { name: 'Композиция' }).click()
    await expect(ayah.getByRole('heading', { name: 'Нить аята', level: 2 })).toBeVisible()

    await page.getByRole('tab', { name: 'Риторика' }).click()
    await expect(ayah.getByRole('heading', { name: 'Связь', level: 4 }).first()).toBeVisible()
    await expect(ayah).not.toContainText('Что здесь видно')
    await expect(ayah).not.toContainText('Как это связано')
    await expect(ayah).not.toContainText('Что это показывает')
    const grammarReference = ayah.locator('.rhetoric-source-note a')
    await expect(grammarReference).toHaveAttribute('href', /chapter=2&verse=197/)
  })

  test('composition and rhetoric keep mobile reading vertical without horizontal drift', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openSearch(page, 'taqwa')

    await page.locator('.node-quran').click()
    const reference = page.locator('.quran-reference-grid button.has-prototype').filter({ hasText: '2:197' })
    await reference.click()

    const ayah = page.locator('.ayah-space-shell')
    const viewport = ayah.locator('.ayah-space-viewport')
    const world = ayah.locator('.ayah-space-world')

    const cameraOffset = async () => world.evaluate((element) => {
      const match = element.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/)
      return match ? { x: Number(match[1]), y: Number(match[2]) } : { x: NaN, y: NaN }
    })

    const diagonalDrag = async () => {
      const box = await viewport.boundingBox()
      if (!box) throw new Error('Ayah viewport is not measurable')
      const startX = box.x + box.width * .52
      const startY = box.y + box.height * .62
      await page.mouse.move(startX, startY)
      await page.mouse.down()
      await page.mouse.move(startX + 110, startY - 140, { steps: 6 })
      await page.mouse.up()
    }

    for (const tab of ['Композиция', 'Риторика']) {
      await page.getByRole('tab', { name: tab }).click()
      await expect(viewport).toHaveAttribute('data-pan-axis', 'vertical')
      await page.waitForTimeout(80)

      const before = await cameraOffset()
      await diagonalDrag()
      const after = await cameraOffset()

      expect(Number.isFinite(after.x)).toBeTruthy()
      expect(Math.abs(after.x)).toBeLessThan(.01)
      expect(Math.abs(after.y - before.y)).toBeGreaterThan(20)
    }
  })

  test('2:197 taqwa keeps approved meaning layers and Ayah Space connector contract', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openSearch(page, 'taqwa')

    await page.locator('.node-quran').click()
    const reference = page.locator('.quran-reference-grid button.has-prototype').filter({ hasText: '2:197' })
    await reference.click()

    const ayah = page.locator('.ayah-space-shell')
    const taqwa = ayah.locator('.analysis-inline-word').nth(25)
    await taqwa.click()

    const meaning = page.locator('.word-meaning-view')
    await expect(meaning).toBeVisible()
    await expect(meaning.locator('.word-meaning-gloss')).toHaveText('Благочестие')
    await expect(meaning).toContainText('Почитание Всевышнего')
    await expect(meaning.getByRole('heading', { name: 'Значение', level: 3 })).toBeVisible()
    await expect(meaning).not.toContainText('Источник состояния')
    await expect(meaning).toContainText('помнит о Нём и Его присутствии')
    await expect(meaning.getByRole('heading', { name: 'Смысл в аяте', level: 3 })).toBeVisible()
    await expect(meaning).not.toContainText('Смысл в этом аяте')
    await expect(meaning).toContainText('Почему такой перевод')

    await page.locator('.analysis-focus-view-switch').getByRole('button', { name: 'Морфология' }).click()
    const morphology = page.locator('.approved-taqwa-baseline')
    await expect(morphology).toBeVisible()

    const connector = await morphology.locator('.analysis-morphology-tree.plain-tree path').first().evaluate((path) => {
      const style = getComputedStyle(path)
      return {
        strokeWidth: style.strokeWidth,
        markerStart: style.markerStart,
        markerMid: style.markerMid,
        markerEnd: style.markerEnd,
      }
    })

    expect(connector.strokeWidth).toBe('1px')
    expect(connector.markerStart).toBe('none')
    expect(connector.markerMid).toBe('none')
    expect(connector.markerEnd).toBe('none')

    await page.locator('.analysis-focus-view-switch').getByRole('button', { name: 'Синтаксис' }).click()
    const syntax = page.locator('.syntax-notebook')
    await expect(syntax).toBeVisible()
    const syntaxLink = syntax.locator('.syntax-link').first()
    await expect(syntaxLink).toBeVisible()
    const syntaxConnector = await syntaxLink.evaluate((path) => {
      const style = getComputedStyle(path)
      return {
        d: path.getAttribute('d'),
        strokeWidth: style.strokeWidth,
        strokeLinecap: style.strokeLinecap,
        strokeLinejoin: style.strokeLinejoin,
        markerEnd: style.markerEnd,
      }
    })
    expect(syntaxConnector.d).toMatch(/M .* V .* H .* V 8/)
    expect(syntaxConnector.d).not.toContain('Q')
    expect(syntaxConnector.strokeWidth).toBe('1px')
    expect(syntaxConnector.strokeLinecap).toBe('butt')
    expect(syntaxConnector.strokeLinejoin).toBe('miter')
    expect(syntaxConnector.markerEnd).not.toBe('none')
  })

  test('Word Orbit meanings are direct, readable, and preserve researched connotations', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })

    await openSearch(page, 'atqa')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    let meaning = page.locator('dialog.detail-sheet[open] .meaning-entry')
    await expect(meaning).toBeVisible()
    await expect(meaning).toContainText('أَتْقَى')
    await expect(meaning).toContainText('atqā')
    await expect(meaning).toContainText('более / наиболее благочестивый')
    await expect(meaning).toContainText('تَقْوَىٰ')
    await expect(meaning).toContainText('taqwā')
    await expect(meaning).toContainText('تَقِيّ')
    await expect(meaning).toContainText('taqiyy')
    await expect(meaning.locator('.meaning-plain-section')).not.toContainText('ٱتَّقَىٰ')
    await expect(meaning.locator('.meaning-plain-section')).not.toContainText('ittaqā')
    await expect(meaning).not.toContainText('саморегуляц')
    await expect(meaning).not.toContainText('осуществляем')
    await expect(meaning.locator('.meaning-map')).toHaveCount(0)

    await openSearch(page, 'ittaqa')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    meaning = page.locator('dialog.detail-sheet[open] .meaning-entry')
    await expect(meaning).toContainText('беречь себя')
    await expect(meaning).toContainText('تَوَقَّىٰ')
    await expect(meaning).toContainText('tawaqqā')
    await expect(meaning).toContainText('конкретной опасности')
    await expect(meaning).toContainText('помня об Аллахе')
    await expect(meaning).not.toContainText('защитно-ориентирован')

    await openSearch(page, 'tawaqqa')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    meaning = page.locator('dialog.detail-sheet[open] .meaning-entry')
    await expect(meaning).toContainText('конкретные меры предосторожности')
    await expect(meaning).toContainText('ٱتَّقَىٰ')
    await expect(meaning).toContainText('ittaqā')
    await expect(meaning).toContainText('конкретной опасности')
    await expect(meaning.locator('.meaning-map')).toHaveCount(0)

    await openSearch(page, 'muttaqin')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    meaning = page.locator('dialog.detail-sheet[open] .meaning-entry')
    await expect(meaning).toContainText('благочестивые, набожные, праведные, осознанные перед Аллахом')
    await expect(meaning).toContainText('Это качество видно')
    await expect(meaning).toContainText('более сильной похвалой')
    await expect(meaning).toContainText('تَقِيّ')
    await expect(meaning).toContainText('taqiyy')

    await openSearch(page, 'taqiyy')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    meaning = page.locator('dialog.detail-sheet[open] .meaning-entry')
    await expect(meaning).toContainText('благочестивый, набожный, праведный')
    await expect(meaning).toContainText('устойчивой и выраженной чертой')
    await expect(meaning).toContainText('более сильной похвалой')
    await expect(meaning).toContainText('مُتَّقٍ')
    await expect(meaning).toContainText('muttaqin')

    await openSearch(page, 'taqwa')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    meaning = page.locator('dialog.detail-sheet[open] .meaning-entry')
    await expect(meaning).toContainText('благочестие, набожность, праведность, осознанность перед Аллахом')
    const positive = meaning.locator('.translation-note-positive')
    const warning = meaning.locator('.translation-note-warning')
    await expect(positive).toContainText('Допустимые переводы')
    await expect(positive).toContainText('2:197')
    await expect(warning).toContainText('Богобоязненность')
    await expect(warning).toContainText('благоговейный трепет')
    await expect(warning).toContainText('почтение')
    await expect(warning).not.toContainText('Осознанность')
  })

  test('translation terms open a compact bottom glossary note on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openSearch(page, 'taqwa')
    await page.locator('.node-meaning').click()

    const meaning = page.locator('dialog.detail-sheet[open] .meaning-entry')
    await expect(meaning).toBeVisible()
    const pietyTerm = meaning.getByRole('button', { name: 'Пояснить термин: благочестие' }).first()
    await expect(pietyTerm).toBeVisible()
    await pietyTerm.click()

    const note = page.locator('.meaning-glossary-note')
    await expect(note).toBeVisible()
    await expect(note.getByRole('heading', { name: 'Благочестие (благочестивый человек)' })).toBeVisible()
    await expect(note).toContainText('почитает Всевышнего')
    await expect(note).toContainText('осознанно следит за своими поступками')
    await expect(note).toContainText(/праведност/)
    await expect(note.getByRole('link', { name: /Грамота\.ру · благочестие/ })).toBeVisible()

    const position = await note.evaluate((element) => {
      const style = getComputedStyle(element)
      return { position: style.position, bottom: style.bottom }
    })
    expect(position.position).toBe('fixed')
    expect(position.bottom).toBe('0px')

    await note.getByRole('button', { name: 'Набожность / набожный' }).click()
    await expect(note.getByRole('heading', { name: 'Набожность / набожный' })).toBeVisible()
    await expect(note).toContainText('глубокая преданность Богу')
    await expect(note).not.toContainText('религиоз')

    await note.getByRole('button', { name: 'Осознанность / осознанный' }).click()
    await expect(note.getByRole('heading', { name: 'Осознанность / осознанный' })).toBeVisible()
    await expect(note).toContainText('действовать сознательно и осмысленно')
    await expect(note).toContainText('В выражении «осознанность перед Аллахом»')

    await note.getByRole('button', { name: 'Праведность (праведный человек)' }).click()
    await expect(note.getByRole('heading', { name: 'Праведность (праведный человек)' })).toBeVisible()
    await expect(note).toContainText('Праведный человек — тот, кто строго следует нравственным нормам')

    await note.getByRole('button', { name: 'Закрыть заметку' }).click()
    await expect(note).toHaveCount(0)
  })

  test('search language controls expose pressed state and Arabic stays directionally marked', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('spatial.html')

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
    await expect(page.getByRole('button', { name: 'RU' })).toHaveAttribute('aria-pressed', 'true')
    await page.getByRole('button', { name: 'EN' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true')

    const input = page.locator('.search-form input')
    await input.fill('taqwa')
    await input.press('Enter')
    await page.locator('.node-meaning').click()

    const meaning = page.locator('dialog.detail-sheet[open] .meaning-entry')
    await expect(meaning).toHaveAttribute('dir', 'ltr')
    await expect(meaning.getByRole('heading', { name: 'Difference' })).toBeVisible()
    await expect(meaning.locator('bdi.inline-arabic').first()).toHaveAttribute('dir', 'rtl')
    await expect(meaning.locator('bdi.inline-arabic').first()).toHaveAttribute('lang', 'ar')
    await expect(meaning).toContainText('mindfulness of Allah')

    const mindfulness = meaning.getByRole('button', { name: 'Explain term: mindfulness of Allah' }).first()
    await expect(mindfulness).toBeVisible()
    await mindfulness.click()

    const note = page.locator('.meaning-glossary-note')
    await expect(note.getByRole('heading', { name: 'Mindfulness of Allah / mindful of Allah' })).toBeVisible()
    await expect(note).toContainText('Actively keeping Allah in mind')
    await expect(note).toContainText('Compared with God-consciousness')
    await expect(note.getByRole('link', { name: /Cambridge Dictionary · mindful/ }).first()).toBeVisible()

    await note.getByRole('button', { name: 'Consciousness', exact: true }).click()
    await expect(note.getByRole('heading', { name: 'Consciousness' })).toBeVisible()
    await expect(note).toContainText('state of understanding, realizing, or being aware')
  })
})
