import { test, expect } from '@playwright/test';
test('system health check', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Toastmaster/);
  await page.click('.debug-btn', { force: true });
  await expect(page.locator('.debug-panel')).toBeVisible();
  await page.click('button:has-text("CLEAR")');
  await page.click('button:has-text("DIAG")');
  await page.click('.debug-btn', { force: true }); 
  await expect(page.locator('.debug-panel')).toBeHidden();
});