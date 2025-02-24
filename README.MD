# Todo Application API

A modern todo application built with nextjs, express and TypeScript.

Todo Application UI is the main repository for local development. It controls both the UI and API development environments locally.

## Prerequisites

- Node.js (v18 or higher)
- npm
- Git

## Setup Instructions

1. Clone the repository

   ```bash
   git clone https://github.com/KristofferHebert/todo-api.git
   cd todo-api
   ```

2. Install dependencies

   ```bash
   npm install

   ```

3. Prisma Setup

   ```bash
   # Generate Prisma Client
   npx prisma generate

   ```

4. Create database tables

   ```bash
    npm run prisma:migrate
    npm run prisma:generate
    npm run prisma:seed

   ```

5. Optional: Start the development server
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Start the production server using `node dist/server.js`
- `npm run dev` - Start development server with TypeScript watch mode and node watch
- `npm run build` - Build the TypeScript project
- `npm run lint` - Run ESLint on TypeScript files
- `npm run format` - Format code using Prettier
- `npm run prisma:migrate` - Run Prisma database migrations
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:seed` - Seed the database using TypeScript Node

## Project Structure

- `src/` - Source code
  - `api/` - API routes and controllers
  - `server.ts` - Main application entry point
- `prisma/` - Database configuration
  - `migrations/` - Database migrations
  - `schema.prisma` - Prisma schema definition
  - `seed.ts` - Database seeding script
