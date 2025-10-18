from playwright.sync_api import sync_playwright, expect
import time

# Create a unique username for this run to avoid registration conflicts
unique_username = f"testuser_{int(time.time())}"
password = "password123"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # --- Registration ---
    page.goto('http://localhost:3000/register.html')
    page.fill('#username', unique_username)
    page.fill('#password', password)
    page.click('button[type="submit"]')

    # Wait for the success message to appear, which is more robust than a fixed timeout
    # CORRECTED the expected text to match the new message in register.html
    expect(page.locator("#message")).to_contain_text("Registration successful! Redirecting to login...")

    # The page should redirect to login automatically. Wait for that to happen.
    page.wait_for_url("**/login.html")

    # --- Login ---
    # We are now on the login page
    page.fill('#username', unique_username)
    page.fill('#password', password)

    # Click the login button and wait for the subsequent navigation to complete
    with page.expect_navigation():
        page.click('button[type="submit"]')

    # Check that we landed on the equipment page
    expect(page).to_have_url("http://localhost:3000/equipment.html")
    page.screenshot(path='jules-scratch/verification/equipment_page.png')

    # --- Navigation to Maintenance Page ---
    # Click the link to go to the maintenance page like a user would
    with page.expect_navigation():
        page.click('a[href="/maintenance.html"]')

    # Check that we landed on the maintenance page
    expect(page).to_have_url("http://localhost:3000/maintenance.html")
    page.screenshot(path='jules-scratch/verification/maintenance_page.png')

    browser.close()
