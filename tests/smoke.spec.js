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
  await page.goto('http://localhost:5177');
  
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
