import { test, expect } from '@playwright/test';
test('role selection logic', async ({ page }) => {
  await page.goto('http://localhost:1777');
  const chat = page.locator('.chat-input input');
  await chat.fill('login as ORGANIZER David');
  await chat.press('Enter');
  const hostRow = page.locator('.role-entry', { hasText: 'Host' });
  await hostRow.click();
  await page.click('.dropdown-item:has-text("David Wilson")');
  await expect(hostRow.locator('.role-val')).toHaveText('David Wilson');
  await expect(hostRow.locator('.role-val')).not.toHaveClass(/open/);
});