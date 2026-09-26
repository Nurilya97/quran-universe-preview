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

test('Rhetoric explains visible relations in concise beginner language', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openAyah197(page)
  await page.getByRole('tab', { name: 'Риторика' }).click()

  const insights = page.locator('.rhetoric-insight')
  await expect(insights).toHaveCount(5)

  const limits = insights.nth(1)
  await expect(limits.locator('h3')).toHaveText('Вступил в хадж → появились границы')
  await expect(limits.locator('.rhetoric-evidence')).toContainText('مَنْ ... فَلَا ... وَلَا ... وَلَا')
  await expect(limits.locator('.rhetoric-connection li').nth(0)).toContainText('فَ связывает условие со следствием')
  await expect(limits.locator('.rhetoric-connection li').nth(1)).toHaveText('Они читаются как единый режим поведения во время хаджа.')

  const provision = insights.nth(3)
  await expect(provision.locator('h3')).toHaveText('Дорожный запас → taqwā')
  await expect(provision.locator('.rhetoric-connection li').nth(0)).toContainText('Повтор корня ز و د')

  const address = insights.nth(4)
  await expect(address.locator('h3')).toHaveText('Taqwā → прямое обращение')
  await expect(address.locator('.rhetoric-evidence')).toContainText('وَٱتَّقُونِ')
  await expect(address.locator('.rhetoric-evidence')).not.toContainText('остерегайтесь Меня')
  await expect(address.locator('.rhetoric-evidence')).not.toContainText('бойтесь Меня')
})
