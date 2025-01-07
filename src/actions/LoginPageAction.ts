import { Page } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage/LoginPage';
import {actionLogger as logger} from '../utils/Logger';
import { URLS } from '../../config/config';

export class LoginPageAction {
    private loginPage: LoginPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
    }

    // Navigate to Login Page
    async navigateToLoginPage() {
        logger.info('Navigating to Login Page');
        this.loginPage.navigateTo(URLS.LOGIN_PAGE);
    }

    // Perform login
    async login(email: string, password: string) {
        // Fill in email field
        await this.loginPage.fillInput(this.loginPage.usernameField, email);
        // Fill in password field
        await this.loginPage.fillInput(this.loginPage.passwordField, password);
        // Submit login form
        await this.loginPage.clickElement(this.loginPage.loginButton);
    }

    // Verify Dashboard loaded
    async verifyLoginSuccesful() {
        const dashboardHeader = this.loginPage.dashboardheader;
        await dashboardHeader.waitFor(); // Wait until the element is loaded
        return dashboardHeader.isVisible();
    }
}
