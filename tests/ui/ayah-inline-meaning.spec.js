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


for (const width of [360, 390, 768, 1280]) {
  test(`Analysis glosses do not overlap at viewport width ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await openAyah197(page)
    const words = page.locator('.analysis-ayah-continuous > .analysis-word-stack')
    await expect(words).toHaveCount(29)
    await page.evaluate(() => document.fonts.ready)
    await page.waitForFunction(() => {
      const line = document.querySelector('.analysis-ayah-continuous')
      return line && getComputedStyle(line).display === 'flex'
        && line.getAnimations({ subtree: true }).every(a => a.playState !== 'running')
    })
    const geometry = await words.evaluateAll(nodes => {
      const rects = nodes.map(node => node.getBoundingClientRect())
      const overlaps = []
      rects.forEach((a, i) => rects.slice(i + 1).forEach((b, j) => {
        if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1
          && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) {
          overlaps.push([i + 1, i + j + 2])
        }
      }))
      const viewport = document.querySelector('.ayah-space-viewport').getBoundingClientRect()
      const tabs = document.querySelector('.ayah-space-modes').getBoundingClientRect()
      const zoom = document.querySelector('.ayah-space-zoom').getBoundingClientRect()
      return {
        overlaps,
        allGlossesInFlow: nodes.every(node => getComputedStyle(node, '::after').position === 'static'),
        controlsClear: viewport.top >= tabs.bottom - 1 && viewport.bottom <= zoom.top + 1,
        left: Math.min(...rects.map(r => r.left)),
        right: Math.max(...rects.map(r => r.right)),
      }
    })
    expect(geometry.overlaps).toEqual([])
    expect(geometry.allGlossesInFlow).toBe(true)
    expect(geometry.controlsClear).toBe(true)
    expect(geometry.left).toBeGreaterThanOrEqual(0)
    expect(geometry.right).toBeLessThanOrEqual(width + 1)
  })
}
