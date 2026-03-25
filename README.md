# Vendor Car Rental Management System 🚗💨

A professional, production-ready dashboard for car rental vendors to manage their fleet, track live bookings, and analyze earnings. Built with a focus on speed, scalability, and high-quality UX.

## 🌟 Features

-   **Earnings Analytics:** Real-time revenue tracking using **Chart.js** with daily/weekly insights.
-   **Fleet Management:** Complete CRUD operations for car listings with status tracking (Available, Booked, Maintenance).
-   **Booking Workflow:** Manage incoming requests with a specialized status-based filtering system.
-   **Secure Profile:** Vendor business details management with read-only protected fields (Email).
-   **Modern UI/UX:** Built with **Shadcn UI**, **Tailwind CSS**, and **Lucide Icons** for a premium SaaS feel.
-   **Firebase Backend:** Integrated with Firebase Auth, Firestore, and Cloud Functions for a serverless architecture.

## 🛠️ Tech Stack

-   **Framework:** React 19 + TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** Shadcn UI (Radix UI Primitives)
-   **Icons:** Lucide React
-   **Charts:** Chart.js + React-Chartjs-2
-   **Backend/Auth:** Firebase 10+
-   **Runtime:** Node.js v24.13.0

## 🚀 Getting Started

### Prerequisites

-   **Node.js:** `v24.13.0` 
-   **npm** or **yarn**
-   A Firebase Project (Google Cloud Console)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/nobinsj/crs-vendor.git](https://github.com/nobinsj/crs-vendor.git)
    cd crs-vendor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your Firebase configuration:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MSG_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

