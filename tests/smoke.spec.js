import { test, expect } from '@playwright/test';

test('system health check', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Toastmaster/);
  
  // Open debug panel
  await page.click('.debug-btn');
  await expect(page.locator('.debug-panel')).toBeVisible();
  
  // Run health check
  await page.click('button:has-text("HEALTH")');
  const healthLog = page.locator('.log-entry', { hasText: 'HEALTH_REPORT' });
  await expect(healthLog.first()).toBeVisible();
});

test('navigation intent', async ({ page }) => {
  await page.goto('/');
  const chatInput = page.locator('.chat-input input');
  
  await chatInput.waitFor({ state: 'visible' });
  await chatInput.fill('go to members');
  await chatInput.press('Enter');
  
  await expect(page.locator('.member-registry-screen')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('.member-card')).not.toHaveCount(0);
});
