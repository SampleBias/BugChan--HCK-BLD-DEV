# BugChan 🪳

*the only good bug is a dead buug - Starship troopers*

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SampleBias/BugChan--HCK-BLD-DEV)

BugChan is a minimalist, single-page, anonymous web application designed for logging transient issues for the HCK-BLD-DEV team. Inspired by the simple, direct aesthetic of message boards like 4chan, it provides a streamlined user experience. The application features an anonymous issue submission form, a public, reverse-chronological issue board where all posts ('bugs') are automatically hidden from view 24 hours after submission, and a simple bar chart dashboard visualizing the most common error types reported within the last 24 hours. The entire application is built on the Cloudflare serverless stack, using a React frontend and a Hono-based Worker backend with a single Durable Object for all data persistence, ensuring high performance and scalability.

## Key Features

-   **Anonymous Issue Submission**: A simple, validation-enabled form for logging new bugs without requiring user accounts.
-   **Public Issue Board**: A reverse-chronological feed of all issues posted in the last 24 hours.
-   **24-Hour Expiry**: Issues are automatically filtered from view 24 hours after their submission timestamp to keep the board fresh.
-   **Error Dashboard**: A simple bar chart visualizing the most common error types reported in the last 24 hours.
-   **Minimalist UI**: A clean, functional, and content-focused design inspired by classic message boards.
-   **Serverless Architecture**: Built entirely on the Cloudflare stack for global performance and scalability.

## Technology Stack

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS
-   **UI Components**: Shadcn/UI, Lucide React
-   **Forms**: React Hook Form with Zod for validation
-   **Backend**: Cloudflare Workers, Hono
-   **Data Persistence**: Cloudflare Durable Objects
-   **Tooling**: `bun`, `wrangler`

## Project Structure

The project is organized into three main directories:

-   `src/`: Contains the React frontend application, including pages, components, hooks, and styles.
-   `worker/`: Contains the Cloudflare Worker backend code, including the Hono router and the Durable Object implementation.
-   `shared/`: Contains TypeScript types and interfaces shared between the frontend and backend to ensure type safety.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   A Cloudflare account and the `wrangler` CLI authenticated.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd bugchan
    ```

2.  **Install dependencies:**
    This project uses `bun` as the package manager.
    ```bash
    bun install
    ```

### Running in Development Mode

To start the local development server, which includes hot-reloading for both the frontend and the worker, run:

```bash
bun dev
```

This will start the Vite development server for the React app and a local `workerd` instance for the backend, accessible at `http://localhost:3000`.

## Deployment

This application is designed to be deployed to Cloudflare's global network.

1.  **Build the project:**
    This command bundles the React application and prepares the worker script for deployment.
    ```bash
    bun build
    ```

2.  **Deploy to Cloudflare:**
    Run the deploy command using `wrangler`. This will publish your worker and assets to your Cloudflare account.
    ```bash
    bun deploy
    ```

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SampleBias/BugChan--HCK-BLD-DEV)

## API Endpoints

The backend exposes a simple REST API for managing bugs:

-   `GET /api/bugs`: Fetches all bugs stored in the Durable Object.
-   `POST /api/bugs`: Creates a new bug. Expects a JSON body matching the `Bug` type.

All client-side filtering (e.g., the 24-hour expiry) is handled by the React application after fetching the full list of bugs.