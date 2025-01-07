// @ts-check
import { test, expect } from '@playwright/test';

test('should display homepage', async ({page})=>{
  await page.goto('http://localhost:5173/')
  await expect(page).toHaveTitle(/MyData/i);
})

test('submits the client login form and navigates to the Appliance page', async ({ page }) => {
  await page.goto('http://localhost:5173/clientlogin?toPage=Appliance'); // Use the correct URL

  const usernameInput = page.locator('input#usernameInput');
  const passwordInput = page.locator('input#passwordInput');
  const submitButton = page.locator('button');

  // Fill out the form
  await usernameInput.fill('123456789');
  await passwordInput.fill('password123');

  // Click the submit button
  await submitButton.click();

  // After submission, check if the page navigates to the Appliance page
  await expect(page).toHaveURL(/.*appliance/); // Make sure the URL has "Appliance"
});
