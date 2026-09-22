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

  test('search language controls expose pressed state and Arabic stays directionally marked', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('spatial.html')

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
    await expect(page.getByRole('button', { name: 'RU' })).toHaveAttribute('aria-pressed', 'true')
    await page.getByRole('button', { name: 'EN' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true')
  })
})
