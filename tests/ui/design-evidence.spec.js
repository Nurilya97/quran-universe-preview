import { test, expect } from '@playwright/test'

async function openSearch(page, query) {
  await page.goto('spatial.html')
  const input = page.locator('.search-form input')
  await expect(input).toBeVisible()
  await input.fill(query)
  await input.press('Enter')
}

async function openAyah197(page) {
  await openSearch(page, 'taqwa')
  await expect(page.locator('.word-stage')).toBeVisible()
  await page.locator('.node-quran').click()
  await expect(page.locator('dialog.detail-sheet[open]')).toBeVisible()
  const reference = page.locator('.quran-reference-grid button.has-prototype').filter({ hasText: '2:197' })
  await expect(reference).toBeEnabled()
  await reference.click()
  await expect(page.locator('.ayah-space-shell')).toBeVisible()
}

async function snap(page, testInfo, name) {
  await page.screenshot({
    path: testInfo.outputPath(name + '.png'),
    fullPage: true,
  })
}

for (const viewport of [
  { id: 'desktop', width: 1280, height: 900 },
  { id: 'mobile', width: 390, height: 844 },
]) {
  test('design evidence · search · ' + viewport.id, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('spatial.html')
    await expect(page.locator('.search-stage')).toBeVisible()
    await snap(page, testInfo, 'search-' + viewport.id)
  })

  test('design evidence · root lbb · ' + viewport.id, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await openSearch(page, 'lbb')
    await expect(page.locator('.root-stage-lbb')).toBeVisible()
    await snap(page, testInfo, 'root-lbb-' + viewport.id)
  })

  test('design evidence · word taqwa · ' + viewport.id, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await openSearch(page, 'taqwa')
    await expect(page.locator('.word-stage')).toBeVisible()
    await snap(page, testInfo, 'word-taqwa-' + viewport.id)
  })
}

test('design evidence · word Quran panel · mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openSearch(page, 'taqwa')
  await page.locator('.node-quran').click()
  await expect(page.locator('dialog.detail-sheet-quran[open]')).toBeVisible()
  await snap(page, testInfo, 'word-quran-panel-mobile')
})

test('design evidence · word Meaning panel · mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openSearch(page, 'taqwa')
  await page.locator('.node-meaning').click()
  await expect(page.locator('dialog.detail-sheet-meaning[open]')).toBeVisible()
  await snap(page, testInfo, 'word-meaning-panel-mobile')
})

test('design evidence · ayah 2:197 analysis · desktop', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await openAyah197(page)
  await snap(page, testInfo, 'ayah-2-197-analysis-desktop')
})

test('design evidence · ayah 2:197 analysis · mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openAyah197(page)
  await snap(page, testInfo, 'ayah-2-197-analysis-mobile')
})

test('design evidence · ayah 2:197 word focus · mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openAyah197(page)
  const entry = page.locator('.analysis-inline-word.is-entry').first()
  await expect(entry).toBeVisible()
  await entry.click()
  await expect(page.locator('.analysis-focus-overlay')).toBeVisible()
  await snap(page, testInfo, 'ayah-2-197-word-focus-mobile')
})

test('design evidence · ayah 2:197 composition · mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openAyah197(page)
  await page.getByRole('tab', { name: 'Композиция' }).click()
  await expect(page.getByRole('heading', { name: 'Нить аята', level: 2 })).toBeVisible()
  await snap(page, testInfo, 'ayah-2-197-composition-mobile')
})

test('design evidence · ayah 2:197 rhetoric · mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openAyah197(page)
  await page.getByRole('tab', { name: 'Риторика' }).click()
  await expect(page.getByRole('heading', { name: 'Связь', level: 4 }).first()).toBeVisible()
  await snap(page, testInfo, 'ayah-2-197-rhetoric-mobile')
})
