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
  await expect(reference).toBeEnabled()
  await reference.click()
  await expect(page.locator('.ayah-space-shell')).toBeVisible()
}

test('Ayah Space keeps word meanings attached to the Arabic without another navigation layer', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openAyah197(page)

  const ayah = page.locator('.ayah-space-shell')
  await expect(ayah.getByRole('tab', { name: 'Понять аят' })).toHaveCount(0)
  await expect(ayah.getByRole('tab', { name: 'Исследовать' })).toHaveCount(0)

  const words = ayah.locator('.analysis-ayah-continuous > .analysis-word-stack')
  await expect(words).toHaveCount(29)
  await expect(words.nth(0)).toHaveAttribute('data-gloss', 'хадж')
  await expect(words.nth(1)).toHaveAttribute('data-gloss', 'месяцы')
  await expect(words.nth(25)).toHaveAttribute('data-gloss', 'благочестие')

  const ittaquni = words.nth(26)
  await expect(ittaquni).toHaveAttribute('data-gloss', 'wa-ittaqūnī · перевод уточняется')
  await expect(ittaquni).toHaveAttribute('data-translation-status', 'researching')
  await expect(ittaquni).not.toHaveAttribute('data-gloss', /остерегайтесь Меня/i)
  await expect(ittaquni).not.toHaveAttribute('data-gloss', /бойтесь Меня/i)

  await words.nth(25).locator('.analysis-inline-word').click()
  await expect(page.locator('.word-meaning-view')).toBeVisible()
})
