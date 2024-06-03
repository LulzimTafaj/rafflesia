import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.waitForSelector("[name=email]");
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForSelector("Sign in Succesful!");
});

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`);
    await page.waitForSelector(`[name="name"]`);
    await page.locator(`[name="name"]`).fill("Test Hotel");
    await page.locator(`[name="city"]`).fill("Test City");
    await page.locator(`[name="country"]`).fill("Test Country");
    await page.locator(`[name="description"]`).fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");
    await page.waitForSelector("text=Budget");
    await page.click("text=Budget");
    await page.waitForSelector("text=Free WiFi");
    await page.check("text=Free WiFi");
    await page.check("text=Parking");
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg"),
    ]);
    await page.getByRole("button", { name: "Save" }).click();
    await page.waitForSelector("text=Hotel Saved!");
});

test("should edit hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`);
    await page.waitForSelector("text=View Details");
    await page.click("text=View Details");
    await page.waitForSelector(`[name="name"]`);
    await page.locator('[name="name"]').fill("Test Hotel UPDATED");
    await page.getByRole("button", { name: "Save"}).click();
    await page.waitForSelector("text=Hotel Saved!");
    await page.reload();
    await page.waitForSelector(`[name="name"]`);
    await expect(page.locator('[name="name"]')).toHaveValue("Test Hotel UPDATED");
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.getByRole("button", { name: "Save"}).click();
});
