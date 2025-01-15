// @ts-check
import { test, expect } from '@playwright/test';

test('should display homepage', async ({page})=>{
  await page.goto('http://localhost:5173/')
 })

test('submits the client login form and navigates to the Appliance page', async ({ page }) => {
  await page.goto('http://localhost:5173/clientlogin?toPage=Appliance'); // Use the correct URL

  const usernameInput = page.locator('input#uid');
  const passwordInput = page.locator('input#pin');
  const submitButton = page.locator('button:has-text("登入")');

  // Fill out the form
  await usernameInput.fill('123456789');
  await passwordInput.fill('password123');

  // Click the submit button
  await submitButton.click();

  // After submission, check if the page navigates to the Appliance page
  await expect(page).toHaveURL(/.*appliance/); // Make sure the URL has "Appliance"
});

test('inputs expected to have value', async ({ page }) =>{
  await page.goto('http://localhost:5173/appliance');

  const nationalid = page.locator('input#nationalid');
  const pincode = page.locator('input#pincode');
  const region = page.locator('input#region')

  await page.waitForSelector('#nationalid');
   
  await expect(nationalid).toHaveValue(/\S+/)
  // await expect(pincode).toHaveValue(/\S+/)
  // await expect(region).toHaveValue(/\S+/)

});


test('inputs expected to be disabled', async ({ page }) => {
  await page.goto('http://localhost:5173/appliance'); // Use the correct URL
  
  const nationalid = page.locator('input#nationalid');
  const pincode = page.locator('input#pincode');
  const region = page.locator('input#region')

  console.log('Checking if nationalid is disabled...');
  await expect(nationalid).toBeDisabled();
  await expect(pincode).toBeDisabled();
  await expect(region).toBeDisabled();
 

});
