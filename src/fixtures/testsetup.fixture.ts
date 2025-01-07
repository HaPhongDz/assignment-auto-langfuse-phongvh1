import { test as base, Page } from '@playwright/test';
import credentials from '../test-data/credentials.json';
import { LoginPageAction } from '../actions/LoginPageAction';
import * as fs from 'fs';

type MyFixtures = {
    loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
    loggedInPage: async ({ browser }, use, testInfo) => {
        const storageStatePath = 'auth/storageState.json';
        const forceLogin = testInfo.project.metadata.forceLogin || false;
        
        if (fs.existsSync(storageStatePath) && !forceLogin) {
            // Create a new browser context with the storage state
            const context = await browser.newContext({ storageState: storageStatePath });
            // Create a new page within the context
            const page = await context.newPage();
            await use(page);
        }
        else {
            // Create a new browser context
            const context = await browser.newContext();
            // Create a new page within the context
            const page = await context.newPage();

            // Create a new instance of the LoginPage and perform login
            const loginPage = new LoginPageAction(page);
            await loginPage.navigateToLoginPage();
            await loginPage.login(credentials.email, credentials.password);
            await loginPage.verifyLoginSuccesful();

            // Save storage state to file
            await context.storageState({ path: storageStatePath });

            await use(page);
        }

    },
});

export { expect } from '@playwright/test';