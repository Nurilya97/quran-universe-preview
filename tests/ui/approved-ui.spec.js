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
    await expect(page.locator('.detail-sheet.is-open')).toBeVisible()

    const analysisColours = await page.locator('.morphology-entry-taqwa.morphology-entry-neon').evaluate((root) => {
      const changed = root.querySelector('.morph-analysis .morph-rootShift')
      const rootLetter = root.querySelector('.morph-analysis .morph-root')
      if (!changed || !rootLetter) return null
      const changedStyle = getComputedStyle(changed)
      const rootStyle = getComputedStyle(rootLetter)
      return {
        changed: changedStyle.color,
        root: rootStyle.color,
        changedBackground: changedStyle.backgroundImage,
      }
    })
    expect(analysisColours).not.toBeNull()
    expect(analysisColours.changed).toBe(analysisColours.root)
    expect(analysisColours.changedBackground).toBe('none')

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
    // The requested 5px is the visible edge-to-edge gap. The measured
    // center-to-line distance also includes the 2.5px dot radius and the
    // rotated chevron's small visual protrusion.
    const centerGap = geometry.secondCenter - geometry.lineBottom
    expect(centerGap).toBeGreaterThanOrEqual(7)
    expect(centerGap).toBeLessThanOrEqual(10)
    expect(geometry.dotContent).not.toBe('none')
    expect(geometry.dotTop).toBe('0px')
    expect(Number.parseFloat(geometry.dotWidth)).toBeGreaterThan(0)
    expect(geometry.arrowContent).not.toBe('none')
    expect(geometry.arrowBottom).toBe('0px')

    const target = board.locator('.morph-board-target-word')
    await expect(target).toHaveAttribute('lang', 'ar')
    await expect(target).toHaveAttribute('dir', 'rtl')

    const targetColours = await board.evaluate((root) => {
      const changed = root.querySelector('.morph-board-target-word .morph-board-rootShift')
      const rootLetter = root.querySelector('.morph-board-target-word .morph-board-root')
      const form = root.querySelector('.morph-board-target-word .morph-board-form')
      const entry = root.closest('.morphology-entry')
      if (!changed || !rootLetter || !form || !entry) return null
      const entryStyle = getComputedStyle(entry)
      return {
        changed: getComputedStyle(changed).color,
        root: getComputedStyle(rootLetter).color,
        form: getComputedStyle(form).color,
        added: entryStyle.getPropertyValue('--board-added').trim(),
        paper: entryStyle.getPropertyValue('--board-paper').trim(),
      }
    })
    expect(targetColours).not.toBeNull()
    expect(targetColours.changed).toBe(targetColours.root)
    expect(targetColours.changed).not.toBe(targetColours.added)
    await expect(board.locator('.morph-board-key')).toContainText('элемент модели')

    await page.screenshot({
      path: testInfo.outputPath('taqwa-mobile-approved.png'),
      fullPage: true,
    })
  })

  test('mobile detail sheets stay in-layer, keep close on the right, and dismiss without restarting the orbit', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openSearch(page, 'taqwa')

    const orbit = page.locator('.orbit-field')
    await expect(orbit).toBeVisible()
    const orbitBefore = await orbit.evaluate((node) => {
      const rect = node.getBoundingClientRect()
      const stage = node.closest('.word-stage')
      const stageAnimation = stage?.getAnimations?.()[0]
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        transform: getComputedStyle(node).transform,
        stageAnimationName: stage ? getComputedStyle(stage).animationName : 'none',
        stageAnimationState: stageAnimation?.playState || 'none',
      }
    })

    await page.locator('.node-structure').click()
    const structureSheet = page.locator('.detail-sheet.is-open')
    await expect(structureSheet).toBeVisible()

    await expect(structureSheet).toHaveAttribute('data-presentation', 'sheet')
    expect(await structureSheet.evaluate((node) => node.tagName)).toBe('SECTION')
    expect(await structureSheet.evaluate((node) => node.matches(':modal'))).toBe(false)

    const structureClose = structureSheet.locator('.sheet-header-compact .icon-button')
    const closeBox = await structureClose.boundingBox()
    expect(closeBox).not.toBeNull()
    expect(closeBox.x + closeBox.width / 2).toBeGreaterThan(390 * .72)

    const handle = structureSheet.locator('.sheet-handle')
    await expect(handle).toBeVisible()
    const handleBox = await handle.boundingBox()
    expect(handleBox).not.toBeNull()
    const x = handleBox.x + handleBox.width / 2
    const y = handleBox.y + handleBox.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x, y + 110, { steps: 8 })
    const draggedTop = (await structureSheet.boundingBox())?.y
    await page.mouse.up()

    await page.waitForTimeout(90)
    const midDismiss = await structureSheet.evaluate((node) => ({
      hidden: node.hidden,
      top: node.getBoundingClientRect().top,
      dragY: node.style.getPropertyValue('--sheet-drag-y'),
    }))
    if (!midDismiss.hidden && draggedTop != null) {
      expect(midDismiss.top).toBeGreaterThanOrEqual(draggedTop - 1)
      expect(midDismiss.dragY).not.toBe('0px')
    }

    await expect(page.locator('.detail-sheet.is-open')).toHaveCount(0)

    const orbitAfter = await orbit.evaluate((node) => {
      const rect = node.getBoundingClientRect()
      const stage = node.closest('.word-stage')
      const stageAnimation = stage?.getAnimations?.()[0]
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        transform: getComputedStyle(node).transform,
        stageAnimationName: stage ? getComputedStyle(stage).animationName : 'none',
        stageAnimationState: stageAnimation?.playState || 'none',
      }
    })

    // The approved mobile sheet may shift the orbit by a few CSS pixels while
    // keeping the same scene, scale and animation state.
    expect(Math.abs(orbitAfter.x - orbitBefore.x)).toBeLessThanOrEqual(5)
    expect(Math.abs(orbitAfter.y - orbitBefore.y)).toBeLessThanOrEqual(5)
    expect(Math.abs(orbitAfter.width - orbitBefore.width)).toBeLessThanOrEqual(.5)
    expect(Math.abs(orbitAfter.height - orbitBefore.height)).toBeLessThanOrEqual(.5)
    expect(orbitAfter.transform).toBe(orbitBefore.transform)
    expect(orbitAfter.stageAnimationName).toBe(orbitBefore.stageAnimationName)
    expect(orbitAfter.stageAnimationState).toBe('finished')

    await page.locator('.node-meaning').click()
    const meaningSheet = page.locator('.detail-sheet.is-open')
    await expect(meaningSheet).toBeVisible()
    const meaningClose = meaningSheet.locator('.sheet-header .icon-button')
    const meaningCloseBox = await meaningClose.boundingBox()
    expect(meaningCloseBox).not.toBeNull()
    expect(meaningCloseBox.x + meaningCloseBox.width / 2).toBeGreaterThan(390 * .72)

    const meaningHeaderSurface = await meaningSheet.locator('.sheet-header').evaluate((node) => {
      const style = getComputedStyle(node)
      return {
        backgroundImage: style.backgroundImage,
        backgroundColor: style.backgroundColor,
        backdropFilter: style.backdropFilter,
      }
    })
    expect(meaningHeaderSurface.backgroundImage).not.toBe('none')
    expect(meaningHeaderSurface.backgroundColor).not.toBe('rgba(0, 0, 0, 0)')

    await meaningSheet.evaluate((node) => { node.scrollTop = 220 })
    await page.waitForTimeout(80)
    const stickyHeader = meaningSheet.locator('.sheet-header')
    const stickyBox = await stickyHeader.boundingBox()
    const sheetBox = await meaningSheet.boundingBox()
    expect(stickyBox).not.toBeNull()
    expect(sheetBox).not.toBeNull()
    expect(Math.abs(stickyBox.y - sheetBox.y)).toBeLessThanOrEqual(16)
    await expect(meaningClose).toBeVisible()
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

    const mobileAtmosphere = await rootStage.evaluate((element) => {
      const style = getComputedStyle(element, '::before')
      return {
        content: style.content,
        position: style.position,
        backgroundImage: style.backgroundImage,
      }
    })
    expect(mobileAtmosphere.content).not.toBe('none')
    expect(mobileAtmosphere.position).toBe('absolute')
    expect(mobileAtmosphere.backgroundImage).not.toBe('none')

    await expect(rootStage.locator('.root-orbit-inner')).toHaveCount(1)
    await expect(rootStage.locator('.root-legend-orbit')).toHaveCount(1)
    await expect(rootStage.locator('.root-legend-inner')).toHaveCount(1)

    const quranAccent = await rootStage.evaluate((stage) => {
      const star = stage.querySelector('.root-star-quranic')
      const legendDot = stage.querySelector('.root-legend-quran')
      if (!star || !legendDot) return null
      const pointStyle = getComputedStyle(star.querySelector('.star-point'))
      return {
        arabic: getComputedStyle(star.querySelector('.arabic')).color,
        point: pointStyle.backgroundColor,
        pointWidth: pointStyle.width,
        pointHeight: pointStyle.height,
        pointShadow: pointStyle.boxShadow,
        legend: getComputedStyle(legendDot).backgroundColor,
        legendShadow: getComputedStyle(legendDot).boxShadow,
      }
    })
    expect(quranAccent).not.toBeNull()
    expect(quranAccent.arabic).toBe('rgb(255, 255, 255)')
    expect(quranAccent.point).toBe('rgb(255, 255, 255)')
    expect(quranAccent.pointWidth).toBe('6px')
    expect(quranAccent.pointHeight).toBe('6px')
    expect(quranAccent.pointShadow).not.toBe('none')
    expect(quranAccent.legend).toBe('rgb(255, 255, 255)')
    expect(quranAccent.legendShadow).not.toBe('none')

    const markerSizes = await rootStage.evaluate((stage) => ({
      quranic: [...stage.querySelectorAll('.root-star-quranic .star-point')].map(point => getComputedStyle(point).width),
      featuredQuranic: [...stage.querySelectorAll('.root-star-featured.root-star-quranic .star-point')].map(point => getComputedStyle(point).width),
      ordinary: [...stage.querySelectorAll('.root-star:not(.root-star-quranic) .star-point')].map(point => getComputedStyle(point).width),
      legend: getComputedStyle(stage.querySelector('.root-legend-quran')).width,
    }))
    // ل ب ب currently has one Quran-attested visible form in this prototype.
    // The contract is marker styling consistency, not a minimum occurrence count.
    expect(markerSizes.quranic.length).toBeGreaterThan(0)
    expect(new Set(markerSizes.quranic)).toEqual(new Set(['6px']))
    if (markerSizes.featuredQuranic.length > 0) {
      if (markerSizes.featuredQuranic.length > 0) {
      expect(new Set(markerSizes.featuredQuranic)).toEqual(new Set(['6px']))
    }
    }
    expect(markerSizes.ordinary.length).toBeGreaterThan(0)
    expect(new Set(markerSizes.ordinary)).toEqual(new Set(['4px']))
    expect(markerSizes.legend).toBe('6px')

    const whiteStructure = await rootStage.evaluate((stage) => {
      const orbit = stage.querySelector('.root-orbit:not(.root-orbit-inner)')
      const label = orbit?.querySelector('span')
      const word = stage.querySelector('.root-star .arabic')
      if (!orbit || !label || !word) return null
      return {
        word: getComputedStyle(word).color,
        orbit: getComputedStyle(orbit).borderTopColor,
        orbitLabel: getComputedStyle(label).color,
      }
    })
    expect(whiteStructure).not.toBeNull()
    expect(whiteStructure.word).toBe('rgb(255, 255, 255)')
    expect(whiteStructure.orbit).toBe('rgba(255, 255, 255, 0.14)')
    expect(whiteStructure.orbitLabel).toBe('rgba(255, 255, 255, 0.52)')

    const readability = await rootStage.evaluate((stage) => {
      const transliteration = stage.querySelector('.root-star .transliteration')
      const brand = document.querySelector('.brand-button')
      if (!transliteration || !brand) return null
      return {
        transliteration: getComputedStyle(transliteration).color,
        transliterationWeight: getComputedStyle(transliteration).fontWeight,
        brand: getComputedStyle(brand).color,
        brandOpacity: getComputedStyle(brand).opacity,
        brandSize: getComputedStyle(brand).fontSize,
      }
    })
    expect(readability).not.toBeNull()
    expect(readability.transliteration).toBe('rgba(255, 255, 255, 0.68)')
    expect(readability.transliterationWeight).toBe('400')
    expect(readability.brand).toBe('rgb(255, 255, 255)')
    expect(readability.brandOpacity).toBe('1')
    expect(readability.brandSize).toBe('15px')

    const hierarchy = await rootStage.evaluate((stage) => {
      const intro = stage.querySelector('.root-intro .eyebrow')
      const forms = stage.querySelector('.forms-button')
      const reading = stage.querySelector('.root-core-reading')
      const rootMeta = stage.querySelector('.root-core-trigger > span')
      const star = stage.querySelector('.root-star')
      if (!intro || !forms || !reading || !rootMeta || !star) return null
      const introStyle = getComputedStyle(intro)
      const formsStyle = getComputedStyle(forms)
      const readingStyle = getComputedStyle(reading)
      const rootMetaStyle = getComputedStyle(rootMeta)
      return {
        introColor: introStyle.color,
        introSize: introStyle.fontSize,
        introWeight: introStyle.fontWeight,
        formsColor: formsStyle.color,
        formsSize: formsStyle.fontSize,
        readingColor: readingStyle.color,
        readingWeight: readingStyle.fontWeight,
        readingMarginTop: readingStyle.marginTop,
        rootMetaColor: rootMetaStyle.color,
        starOpacity: getComputedStyle(star).opacity,
      }
    })
    expect(hierarchy).not.toBeNull()
    expect(hierarchy.introColor).toBe('rgba(255, 255, 255, 0.72)')
    expect(hierarchy.introSize).toBe('11px')
    expect(hierarchy.introWeight).toBe('400')
    expect(hierarchy.formsColor).toBe('rgba(255, 255, 255, 0.74)')
    expect(hierarchy.formsSize).toBe('13px')
    expect(hierarchy.readingColor).toBe('rgba(255, 255, 255, 0.72)')
    expect(hierarchy.readingWeight).toBe('400')
    expect(hierarchy.readingMarginTop).toBe('6px')
    expect(hierarchy.rootMetaColor).toBe('rgba(255, 255, 255, 0.46)')
    expect(hierarchy.starOpacity).toBe('1')

    const rootReading = rootStage.locator('.root-core-reading')
    await expect(rootReading).toBeVisible()
    await expect(rootReading).toHaveAttribute('lang', 'ar-Latn')
    await expect(rootReading).toHaveAttribute('dir', 'ltr')

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
    await expect(page.locator('.detail-sheet.is-open')).toBeVisible()

    const reference = page.locator('.quran-reference-grid button.has-prototype').filter({ hasText: '2:197' })
    await expect(reference).toBeEnabled()
    await reference.click()

    const ayah = page.locator('.ayah-space-shell')
    await expect(ayah).toBeVisible()
    await expect(ayah.locator('.analysis-verse-reference > span')).toHaveText('2:197')

    const contextTrigger = ayah.locator('.ayah-context-trigger')
    await expect(contextTrigger).toBeVisible()
    await expect(contextTrigger.locator('span')).toBeVisible()
    await expect(contextTrigger).toContainText('Контекст')
    const contextTriggerBox = await contextTrigger.boundingBox()
    expect(contextTriggerBox).not.toBeNull()
    const contextTriggerCss = await contextTrigger.evaluate((node) => {
      const style = getComputedStyle(node)
      return {
        width: Number.parseFloat(style.width),
        height: Number.parseFloat(style.height),
      }
    })
    expect(contextTriggerCss.width).toBeGreaterThanOrEqual(110)
    expect(contextTriggerCss.height).toBeGreaterThanOrEqual(44)
    expect(contextTriggerBox.width).toBeGreaterThanOrEqual(108)
    expect(contextTriggerBox.height).toBeGreaterThanOrEqual(42)

    const words = ayah.locator('.analysis-inline-word')
    await expect(words).toHaveCount(29)
    await expect(words.nth(25)).toHaveClass(/is-entry/)
    await expect(words.nth(25)).toContainText('ٱلتَّقْوَىٰ')

    await page.getByRole('tab', { name: 'Композиция' }).click()
    await expect(ayah.getByRole('heading', { name: 'Нить аята', level: 2 })).toBeVisible()

    await page.getByRole('tab', { name: 'Риторика' }).click()
    await expect(ayah.getByRole('heading', { name: 'Связь', level: 4 })).toHaveCount(0)
    await expect(ayah.getByText('Как устроена связь')).toHaveCount(0)
    await expect(ayah.getByText('Что она даёт')).toHaveCount(0)
    await expect(ayah.locator('.rhetoric-connection li > span').first()).toBeVisible()
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

      const rail = ayah.locator('.ayah-reading-rail')
      await expect(rail).toBeVisible()
      const railButtons = rail.locator('button')
      expect(await railButtons.count()).toBeGreaterThan(1)
      await expect(rail.locator('button[aria-current="step"]')).toHaveCount(1)
      const activeRailNumber = rail.locator('button[aria-current="step"] > span')
      await page.waitForTimeout(220)
      const activeRailNumberStyle = await activeRailNumber.evaluate((node) => {
        const style = getComputedStyle(node)
        return { fontSize: Number.parseFloat(style.fontSize), opacity: Number.parseFloat(style.opacity) }
      })
      expect(activeRailNumberStyle.fontSize).toBeGreaterThanOrEqual(12)
      expect(activeRailNumberStyle.opacity).toBeGreaterThanOrEqual(.95)

      const beforeJump = await cameraOffset()
      await railButtons.last().click()
      await page.waitForTimeout(320)
      const afterJump = await cameraOffset()
      expect(Math.abs(afterJump.x)).toBeLessThan(.01)
      expect(Math.abs(afterJump.y - beforeJump.y)).toBeGreaterThan(20)
      await expect(railButtons.last()).toHaveAttribute('aria-current', 'step')
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
    let meaning = page.locator('.detail-sheet.is-open .meaning-entry')
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
    meaning = page.locator('.detail-sheet.is-open .meaning-entry')
    await expect(meaning).toContainText('беречь себя')
    await expect(meaning).toContainText('تَوَقَّىٰ')
    await expect(meaning).toContainText('tawaqqā')
    await expect(meaning).toContainText('конкретной опасности')
    await expect(meaning).toContainText('помня об Аллахе')
    await expect(meaning).not.toContainText('защитно-ориентирован')

    await openSearch(page, 'tawaqqa')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    meaning = page.locator('.detail-sheet.is-open .meaning-entry')
    await expect(meaning).toContainText('конкретные меры предосторожности')
    await expect(meaning).toContainText('ٱتَّقَىٰ')
    await expect(meaning).toContainText('ittaqā')
    await expect(meaning).toContainText('конкретной опасности')
    await expect(meaning.locator('.meaning-map')).toHaveCount(0)

    await openSearch(page, 'muttaqin')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    meaning = page.locator('.detail-sheet.is-open .meaning-entry')
    await expect(meaning).toContainText('благочестивые, набожные, праведные, осознанные перед Аллахом')
    await expect(meaning).toContainText('Это качество видно')
    await expect(meaning).toContainText('более сильной похвалой')
    await expect(meaning).toContainText('تَقِيّ')
    await expect(meaning).toContainText('taqiyy')

    await openSearch(page, 'taqiyy')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    meaning = page.locator('.detail-sheet.is-open .meaning-entry')
    await expect(meaning).toContainText('благочестивый, набожный, праведный')
    await expect(meaning).toContainText('устойчивой и выраженной чертой')
    await expect(meaning).toContainText('более сильной похвалой')
    await expect(meaning).toContainText('مُتَّقٍ')
    await expect(meaning).toContainText('muttaqin')

    await openSearch(page, 'taqwa')
    await expect(page.locator('.word-stage')).toBeVisible()
    await page.locator('.node-meaning').click()
    meaning = page.locator('.detail-sheet.is-open .meaning-entry')
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

    const meaning = page.locator('.detail-sheet.is-open .meaning-entry')
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

    const meaning = page.locator('.detail-sheet.is-open .meaning-entry')
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
