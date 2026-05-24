import { test, expect } from '@playwright/test';
test('role selection logic', async ({ page }) => {
  await page.goto('http://localhost:1777');
  const chat = page.locator('.chat-input input');
  await chat.fill('login as VPE David');
  await chat.press('Enter');
  const tmRow = page.locator('.role-entry', { hasText: 'Toastmaster' });
  await tmRow.click();
  await page.click('.dropdown-item:has-text("David Wilson")');
  await expect(tmRow.locator('.role-val')).toHaveText('David Wilson');
  await expect(tmRow.locator('.role-val')).not.toHaveClass(/open/);
});