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

test('Composition reads as one connected meaning flow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openAyah197(page)

  await page.getByRole('tab', { name: 'Композиция' }).click()
  const composition = page.locator('.composition-diagram')
  await expect(composition).toBeVisible()
  await expect(composition.locator('.composition-thread h2')).toHaveText('Как развивается смысл аята')

  const steps = composition.locator('.composition-constellation')
  await expect(steps).toHaveCount(5)

  const transition = steps.nth(1).locator('.composition-transition')
  await expect(transition).toBeVisible()
  const transitionStyle = await transition.evaluate((node) => {
    const style = getComputedStyle(node)
    const marker = getComputedStyle(node, '::before')
    return {
      fontSize: Number.parseFloat(style.fontSize),
      color: style.color,
      marker: marker.content,
    }
  })
  expect(transitionStyle.fontSize).toBeGreaterThanOrEqual(15)
  expect(transitionStyle.marker).toContain('↓')

  const copy = steps.nth(1).locator('.composition-copy')
  const copyStyle = await copy.evaluate((node) => ({
    fontSize: Number.parseFloat(getComputedStyle(node).fontSize),
    lineHeight: Number.parseFloat(getComputedStyle(node).lineHeight),
  }))
  expect(copyStyle.fontSize).toBeGreaterThanOrEqual(18)
  expect(copyStyle.lineHeight).toBeGreaterThan(26)
})
