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

test('Composition explains the movement of 2:197 in direct beginner language', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openAyah197(page)

  const ayah = page.locator('.ayah-space-shell')
  await ayah.getByRole('tab', { name: 'Композиция' }).click()

  await expect(ayah.locator('.composition-thread h2')).toHaveText('Как развивается смысл аята')
  await expect(ayah.locator('.composition-thread p')).toContainText('Сначала аят задаёт время хаджа')

  const steps = ayah.locator('.composition-constellation')
  await expect(steps).toHaveCount(5)
  await expect(steps.nth(0).locator('h3')).toHaveText('Когда совершается хадж')
  await expect(steps.nth(3).locator('h3')).toHaveText('От дорожного запаса к taqwā')
  await expect(steps.nth(4).locator('h3')).toHaveText('Финальное обращение')
  await expect(steps.nth(4).locator('.composition-copy')).toContainText('Точный русский эквивалент пока оставляем открытым')
  await expect(steps.nth(4).locator('.composition-copy')).not.toContainText('остерегайтесь Меня')
})
