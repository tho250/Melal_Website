# Boutique La Différence

Premium, modern grocery and home utensils website for Boutique La Différence located in Zindiro, Kigali, Rwanda.

This project is a full-stack web application featuring a React frontend (built with Vite) and a Node.js/Express backend that serves an API powered by an Excel inventory file.

## Features

- **Modern User Interface:** Built with React, Tailwind CSS, and Framer Motion for a smooth, responsive, and aesthetically pleasing experience.
- **Inventory Management:** Product data is sourced directly from an Excel file (`data/inventory.xlsx`), making it easy for store owners to update products without touching code.
- **Product Filtering & Sorting:** The backend API supports dynamic filtering by category and company, as well as sorting by price, category, or company.
- **Single-Server Deployment:** The Express backend is configured to serve both the API endpoints and the static files of the compiled React frontend, simplifying deployment.
- **WhatsApp Integration:** Includes a floating WhatsApp chat button for direct customer communication.

## Tech Stack

- **Frontend:** React 18, React Router, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express, cors, dotenv
- **Data Parsing:** xlsx (SheetJS)

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

## Local Development Setup

1. **Install Dependencies:**
   Run the following command in the root directory to install both frontend and backend dependencies:
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the `.env.example` file (if present) to a new `.env` file and configure any necessary environment variables.
   ```bash
   cp .env.example .env
   ```

3. **Start the Development Servers:**
   - **Frontend (Vite):**
     ```bash
     npm run dev
     ```
     This will start the Vite development server, usually on `http://localhost:5173`.
   
   - **Backend (Express):**
     In a separate terminal window, start the Express server:
     ```bash
     npm run server
     ```
     This will start the backend server using nodemon for automatic restarts on changes, usually on `http://localhost:5000`.

## Production Build & Deployment

The application is configured to run as a single Node.js service in production. The Express server serves the API on `/api/*` and falls back to serving the built React frontend (`dist/index.html`) for all other routes.

1. **Build the Frontend:**
   Compile the React application into static files in the `dist` directory.
   ```bash
   npm run build
   ```

2. **Start the Production Server:**
   Run the Express server to serve the API and the static build.
   ```bash
   npm start
   ```

### Deployment (e.g., Render, Railway, Heroku)

To deploy to a PaaS provider like Render:
1. Connect your GitHub repository.
2. Set the Environment to `Node`.
3. Set the **Build Command** to: `npm install && npm run build`
4. Set the **Start Command** to: `npm start`
5. Ensure any environment variables from your local `.env` are added to the service's environment configuration.

## Project Structure

- `/src`: React frontend source code (components, pages, styles).
- `/server`: Node.js Express backend API and services.
- `/data`: Contains the `inventory.xlsx` file used as the database.
- `/dist`: (Generated) The compiled, production-ready frontend build.

## License

This project is private and proprietary to Boutique La Différence.
