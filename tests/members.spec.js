import { test, expect } from '@playwright/test';
test('member permission restrictions', async ({ page }) => {
  await page.goto('http://localhost:1777');
  const chat = page.locator('.chat-input input');
  await chat.fill('login as Elena Rodriguez'); await chat.press('Enter');
  await expect(page.locator('.system-status-readout')).toContainText('Elena Rodriguez');
  const theme = page.locator('.card', { hasText: 'Meeting Theme' });
  await theme.click(); await expect(theme).not.toHaveClass(/editing/);
  const row = page.locator('.role-entry', { hasText: 'Host' });
  await row.click();
  const items = page.locator('.dropdown-item');
  const count = await items.count();
  for (let i = 0; i < count; i++) {
    const text = (await items.nth(i).innerText()).trim();
    if (text !== 'Clear Role' && !text.includes('Elena Rodriguez')) 
      throw new Error(`Unauthorized: ${text}`);
  }
});

test('guest readonly enforcement', async ({ page }) => {
  await page.goto('http://localhost:1777');
  await expect(page.locator('.system-status-readout')).toContainText('Guest (NONE)');
  const row = page.locator('.role-entry', { hasText: 'Host' });
  await row.click(); await expect(row).not.toHaveClass(/editing/);
  await page.locator('.chat-input input').fill('go to members');
  await page.locator('.chat-input input').press('Enter');
  const card = page.locator('.member-card').first();
  await card.click(); await expect(card).not.toHaveClass(/edit/);
});

test('navigation intent', async ({ page }) => {
  await page.goto('/');
  const chat = page.locator('.chat-input input');
  await chat.fill('go to members'); await chat.press('Enter');
  await expect(page.locator('.system-status-readout')).toContainText('MEMBERS');
});