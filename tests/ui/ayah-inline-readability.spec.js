import { test, expect } from '@playwright/test'

async function openAyah197(page) {
  await page.goto('spatial.html')
  const input = page.locator('.search-form input')
  await expect(input).toBeVisible()
  await input.fill('taqwa')
  await input.press('Enter')
  await expect(page.locator('.word-stage')).toBeVisible()
  await page.locator('.node-quran').click()
  const reference = page.locator('.quran-reference-grid button.has-prototype').filter({ hasText: '2:197' })
  await reference.click()
  await expect(page.locator('.ayah-space-shell')).toBeVisible()
}

test.describe('Ayah inline meaning readability', () => {
  test('mobile Arabic stays compact while glosses are readable and the visible active word uses lemon without underline', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openAyah197(page)

    const ayah = page.locator('.ayah-space-shell')
    const stacks = ayah.locator('.analysis-word-stack')
    await expect(stacks).toHaveCount(29)

    const layout = await ayah.locator('.analysis-ayah-continuous').evaluate((node) => {
      const style = getComputedStyle(node)
      return {
        columnGap: Number.parseFloat(style.columnGap),
        rowGap: Number.parseFloat(style.rowGap),
      }
    })
    expect(layout.columnGap).toBeLessThanOrEqual(8)
    expect(layout.rowGap).toBeGreaterThanOrEqual(35)

    const gloss = await stacks.first().evaluate((node) => {
      const style = getComputedStyle(node, '::after')
      return {
        fontSize: Number.parseFloat(style.fontSize),
        fontWeight: Number.parseInt(style.fontWeight, 10),
        color: style.color,
        position: style.position,
      }
    })
    expect(gloss.fontSize).toBeGreaterThanOrEqual(17)
    expect(gloss.fontWeight).toBeGreaterThanOrEqual(550)
    expect(gloss.color).not.toBe('rgba(187, 198, 203, 0.72)')
    expect(gloss.position).toBe('absolute')

    const entry = ayah.locator('.analysis-inline-word.is-entry')
    await expect(entry).toBeVisible()
    const entryStyle = await entry.evaluate((node) => {
      const style = getComputedStyle(node)
      return {
        color: style.color,
        decoration: style.textDecorationLine,
        borderBottomWidth: style.borderBottomWidth,
      }
    })
    expect(entryStyle.color).toBe('rgb(234, 255, 91)')
    expect(entryStyle.decoration).toBe('none')
    expect(entryStyle.borderBottomWidth).toBe('0px')
  })

  test('word focus keeps the selected semantic phrase visible while unrelated words recede', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openAyah197(page)

    const ayah = page.locator('.ayah-space-shell')
    const entry = ayah.locator('.analysis-inline-word.is-entry')
    await entry.click()
    await expect(ayah).toHaveClass(/has-word-focus/)
    await expect(page.locator('.word-meaning-view')).toBeVisible()

    const related = ayah.locator('.analysis-word-stack:has(.analysis-inline-word.is-related)')
    const unrelated = ayah.locator('.analysis-word-stack:not(:has(.analysis-inline-word.is-related))')
    await expect(related).toHaveCount(5)
    expect(await unrelated.count()).toBeGreaterThan(0)

    await page.waitForTimeout(320)
    const relatedOpacity = await related.first().evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity))
    const unrelatedOpacity = await unrelated.first().evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity))
    expect(relatedOpacity).toBeGreaterThan(unrelatedOpacity)
    expect(relatedOpacity).toBeGreaterThanOrEqual(.6)
    expect(unrelatedOpacity).toBeLessThanOrEqual(.15)
  })
})
