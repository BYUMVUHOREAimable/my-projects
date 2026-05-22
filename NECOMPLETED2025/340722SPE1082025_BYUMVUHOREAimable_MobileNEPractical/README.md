# Personal Finance Tracker (React Native)

A cross-platform mobile application (Android & iOS) for tracking personal expenses and managing budgets. Built with React Native and Expo, this app helps users log daily expenses, view spending details, and manage their financial budgets effectively.

**Developed by: BYUMVUHORE Aimable**
**Contact: aimablebyumvuhore@gmail.com**

## Core Features

*   **User Login:** Secure login with username and password.
*   **Expense Tracking:** Create, view, update, and delete expenses (name, amount, category, date, description).
*   **Budget Management:** View, add, edit, and delete budget items (category, amount, period).
*   **Data Persistence:** Uses MockAPI for backend data storage and AsyncStorage for session management.

## Tech Stack

*   **React Native (Expo)**
*   **React Navigation**
*   **Axios** (for API calls)
*   **React Context API** (for state management)

## API Backend

This app connects to a [MockAPI](https://www.mockapi.io/) instance.
*   **Base URL:** `https://67ac71475853dfff53dab929.mockapi.io/api/v1`
*   Endpoints: `/users` and `/expenses`

## Prerequisites

*   Node.js (LTS version recommended)
*   NPM or Yarn
*   Expo Go app on your mobile device or an emulator/simulator.
*   Git

## Getting Started

Follow these steps to clone the repository and run the application locally:

1.  **Clone the Repository:**
    Open your terminal and run:
    ```bash
    git clone https://github.com/BYUMVUHOREAimable/MobileNE2025Practical.git
    cd MobileNE2025Practical
    ```
2.  **Install Dependencies:**
    Navigate into the project directory (`PersonalFinanceTracker`) if you haven't already, then:
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

3.  **Start the Development Server:**
    ```bash
    npx expo start
    ```
    *(You can use `npx expo start -c` to clear the cache if you encounter bundling issues.)*

4.  **Run the App:**
    *   **On your phone:** Install the "Expo Go" app from the App Store or Google Play. Scan the QR code shown in your terminal or the web browser tab that opens.
    *   **On an emulator/simulator:**
        *   Press `a` in the terminal (for Android).
        *   Press `i` in the terminal (for iOS simulator - macOS only).

## Sample Login Credentials

Use these credentials from the MockAPI to test the login:

*   **Username:** `Rosalyn59@hotmail.com`
    **Password:** `GjFIrSgyliG8tW5`
*   **Username:** `Maci94@hotmail.com`
    **Password:** `R0ChVUODGqjwaAF`

## Key Functionalities

*   Login to access your financial data.
*   Navigate to "My Expenses" to view, add, edit, or delete expense records.
*   Go to "Manage Budgets" (from the "My Expenses" screen header) to set and update your budget categories and amounts.

---

Feel free to reach out if you have any questions or feedback!