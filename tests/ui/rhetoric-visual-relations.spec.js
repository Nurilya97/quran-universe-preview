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

test('Rhetoric shows the Arabic construction as relation nodes on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openAyah197(page)
  await page.getByRole('tab', { name: 'Риторика' }).click()

  const rhetoric = page.locator('.rhetoric-diagram')
  await expect(rhetoric).toBeVisible()
  const insights = rhetoric.locator('.rhetoric-insight')
  await expect(insights).toHaveCount(5)

  const firstPhrase = insights.first().locator('.rhetoric-phrase')
  const focus = firstPhrase.locator('span.is-focus').first()
  await expect(focus).toBeVisible()

  const relationNode = await focus.evaluate((node) => {
    const word = getComputedStyle(node)
    const marker = getComputedStyle(node, '::after')
    return {
      opacity: Number.parseFloat(word.opacity),
      markerBackground: marker.backgroundColor,
      markerSize: Number.parseFloat(marker.width),
    }
  })
  expect(relationNode.opacity).toBe(1)
  expect(relationNode.markerBackground).toBe('rgb(234, 255, 91)')
  expect(relationNode.markerSize).toBeGreaterThanOrEqual(7)

  const provision = insights.filter({ hasText: 'Внешний → внутренний запас' })
  const entry = provision.locator('.rhetoric-phrase span.is-entry')
  await expect(entry).toBeVisible()
  expect(await entry.evaluate((node) => getComputedStyle(node).color)).toBe('rgb(234, 255, 91)')

  const connection = insights.nth(1).locator('.rhetoric-connection > ul')
  const flow = await connection.evaluate((node) => ({
    columns: getComputedStyle(node).gridTemplateColumns,
    arrow: getComputedStyle(node.children[0], '::after').content,
  }))
  expect(flow.columns.trim().split(/\s+/)).toHaveLength(1)
  expect(flow.arrow).toContain('↓')
})
