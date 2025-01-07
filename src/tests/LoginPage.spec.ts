import { test, expect } from '@playwright/test';
import credentials from '../test-data/credentials.json'
import { LoginPageAction } from '../actions/LoginPageAction';

test('test - login page', async ({ page }) => {
    const loginPageAction = new LoginPageAction(page);

    // Step 1: Navigate to Login Page
    await loginPageAction.navigateToLoginPage();

    // Step 2: Select EU region and Fill Email and Password and Submit Login Form
    await loginPageAction.login(credentials.email, credentials.password);

    // Step 5: Verify Login Succesful
    const isDashboardVisible = await loginPageAction.verifyLoginSuccesful();
    expect(isDashboardVisible).toBeTruthy();
});
