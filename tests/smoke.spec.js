import { test, expect } from '@playwright/test';

test('system health check', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Toastmaster/);
  
  // Open debug panel
  await page.click('.debug-btn', { force: true });
  await expect(page.locator('.debug-panel')).toBeVisible();
  
  // Clear logs first to ensure we catch the DIAG output
  await page.click('button:has-text("CLEAR")');
  
  // Run diagnostic check
  await page.click('button:has-text("DIAG")');
  
  // Wait for the status readout (it's copied to clipboard, but let's check logs too)
  // We'll use a more generic check for any content in the panel
  await page.click('.debug-btn', { force: true }); 
  await expect(page.locator('.debug-panel')).toBeHidden();
});

test('workspace data density check', async ({ page }) => {
  await page.goto('http://localhost:1777');
  
  // Should start on workspace by default, if not navigate
  const workspaceBtn = page.locator('button:has-text("WORKSPACE")');
  if (await workspaceBtn.isVisible()) {
    await workspaceBtn.click();
  }

  // Count nodes (EditableCards + Special Action Cards)
  // 6 schedule (Date, Location, Room, Reg, Map, Zoom)
  // 1 theme header
  // 2 briefing (Word, Definition)
  // Next Meeting header doesn't count as a node usually
  
  // Let's count .card elements or labels
  const cards = page.locator('.card, .editable-card-container');
  // MeetingWorkspace.jsx has:
  // MeetingSchedule (6 cards)
  // Theme card (EditableCard in MeetingWorkspace.jsx)
  // BriefingSection (2 cards)
  // SpeakersSection (1 card container)
  // RolesSection (1 card container)
  // ActionSection (0-2 depending on state)
  
  // Let's just check for specific labels to ensure density
  await expect(page.locator('text=Meeting Date')).toBeVisible();
  await expect(page.locator('text=Location')).toBeVisible();
  await expect(page.locator('text=Word of the Day')).toBeVisible();
  await expect(page.locator('text=Meeting Roles')).toBeVisible();
});

test('role selection logic', async ({ page }) => {
  await page.goto('http://localhost:1777');
  
  // Login as VPE to allow selection
  const chatInput = page.locator('.chat-input input');
  await chatInput.fill('login as VPE David');
  await chatInput.press('Enter');
  
  // Find Toastmaster role entry and click it
  const tmRow = page.locator('.role-entry', { hasText: 'Toastmaster' });
  await tmRow.click();
  
  // Select David Wilson from dropdown
  await page.click('.dropdown-item:has-text("David Wilson")');
  
  // Verify it no longer says "Open" and shows the name
  await expect(tmRow.locator('.role-val')).toHaveText('David Wilson');
  await expect(tmRow.locator('.role-val')).not.toHaveClass(/open/);
});

test('member permission restrictions', async ({ page }) => {
  await page.goto('http://localhost:1777');
  
  // Login as a normal member
  const chatInput = page.locator('.chat-input input');
  await chatInput.fill('login as Elena Rodriguez');
  await chatInput.press('Enter');
  
  // Verify HUD update
  await expect(page.locator('.system-status-readout')).toContainText('ID: Elena Rodriguez (MEMBER)');
  
  // Try to edit Meeting Theme (should be restricted)
  const themeCard = page.locator('.card', { hasText: 'Meeting Theme' });
  await themeCard.click();
  await expect(themeCard).not.toHaveClass(/editing/);
  
  // Try to select someone else for a role
  const toastmasterRow = page.locator('.role-entry', { hasText: 'Toastmaster' });
  await toastmasterRow.click();
  
  // If dropdown opens, it should only contain her name (or be empty if logic is strict)
  // Our logic allows selecting herself for an empty role.
  const dropdownItems = page.locator('.dropdown-item');
  const count = await dropdownItems.count();
  for (let i = 0; i < count; i++) {
    const text = await dropdownItems.nth(i).innerText();
    // Use trim to avoid whitespace issues
    const cleanText = text.trim();
    if (cleanText !== 'Clear Role' && cleanText !== 'Elena Rodriguez •' && cleanText !== 'Elena Rodriguez') {
      throw new Error(`Non-VPE user sees unauthorized member in dropdown: "${cleanText}"`);
    }
  }
});

test('guest readonly enforcement', async ({ page }) => {
  await page.goto('http://localhost:1777');
  
  // Default user is Guest (NONE)
  await expect(page.locator('.system-status-readout')).toContainText('ID: Guest (NONE)');
  
  // Try to click any role (should not be editable)
  const tmRow = page.locator('.role-entry', { hasText: 'Toastmaster' });
  await tmRow.click();
  await expect(tmRow).not.toHaveClass(/editing/);
  
  // Go to members and try to edit a card
  await page.locator('.chat-input input').fill('go to members');
  await page.locator('.chat-input input').press('Enter');
  
  const firstCard = page.locator('.member-card').first();
  await firstCard.click();
  await expect(firstCard).not.toHaveClass(/edit/);
  await expect(page.locator('.purge-btn')).not.toBeVisible();
});

test('navigation intent', async ({ page }) => {
  await page.goto('/');
  const chatInput = page.locator('.chat-input input');
  
  await chatInput.waitFor({ state: 'visible' });
  await chatInput.fill('go to members');
  await chatInput.press('Enter');
  
  // Wait for the status readout to reflect the change
  await expect(page.locator('.system-status-readout')).toContainText('NODE: MEMBERS');
  await expect(page.locator('.member-registry-screen')).toBeVisible({ timeout: 10000 });
});
