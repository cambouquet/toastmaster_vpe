import { test, expect } from '@playwright/test';
test('workspace data density check', async ({ page }) => {
  await page.goto('http://localhost:1777');
  const ws = page.locator('button:has-text("WORKSPACE")');
  if (await ws.isVisible()) await ws.click();
  await expect(page.locator('text=Meeting Date')).toBeVisible();
  await expect(page.locator('text=Location')).toBeVisible();
  await expect(page.locator('text=Word of the Day')).toBeVisible();
  await expect(page.locator('text=Meeting Roles')).toBeVisible();
});