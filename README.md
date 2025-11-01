# Currency Converter

A modern web application that displays daily exchange rates from the Czech National Bank (CNB). Built with React, TypeScript, and server-side rendering, this application fetches current exchange rates from the CNB API and presents them in a clean, responsive interface.

## Features

- **Real-time Exchange Rates**: Fetches and displays daily exchange rates from the Czech National Bank API
- **Multi-page Navigation**: Client-side routing with React Router, featuring Home and About pages
- **Active Link Indicators**: Visual indicators for the current active route in the navigation
- **Server-Side Rendering (SSR)**: Full SSR support with Express for improved performance, SEO, and initial page load times
- **Data Prefetching**: Intelligent route-based data prefetching during SSR for optimal user experience
- **Responsive Design**: Modern UI that adapts to light and dark color schemes based on system preferences
- **Data Caching**: Efficient data fetching and caching using React Query with 1-hour stale time
- **Type Safety**: Fully typed with TypeScript
- **Styled Components**: Component-scoped styling with CSS-in-JS

## Tech Stack

### Core Technologies
- **React 19** - Latest React features with TypeScript
- **TypeScript** - Full type safety throughout the application
- **Vite 7** - Fast build tooling and development server
- **React Router 7** - Client-side routing with NavLink for active state management
- **React Query (@tanstack/react-query)** - Data fetching, caching, and state management
- **Styled Components 6** - CSS-in-JS styling solution

### Server & Deployment
- **Express 5** - SSR server for Node.js
- **Vercel** - Serverless deployment with API routes
- **TSX** - TypeScript execution for Node.js

### Additional Tools
- **ESLint** - Code linting and quality checks

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server with SSR enabled:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build the application for production:

```bash
npm run build
```

This will:
- Compile TypeScript
- Build the client-side bundle
- Build the server-side entry point

### Production Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
currency-converter/
├── api/
│   └── index.ts              # Vercel serverless API handler
├── src/
│   ├── components/
│   │   ├── ExchangeRatesTable.tsx  # Exchange rates table component
│   │   ├── layout/
│   │   │   ├── Top.tsx            # Navigation header with active link states
│   │   │   └── PageHeader.tsx     # Page header component
│   │   ├── ui/
│   │   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   │   └── Paper.tsx          # Paper-like container component
│   │   └── utils/
│   │       ├── RoutePrefetcher.tsx # Route data prefetching utility
│   │       └── StateResolver.tsx   # State resolution for SSR
│   ├── hooks/
│   │   └── useExchangeRates.ts    # Custom hook for exchange rates
│   ├── pages/
│   │   ├── Home.tsx               # Home page with exchange rates
│   │   └── About.tsx              # About page
│   ├── services/
│   │   └── cnbApi.ts              # CNB API service
│   ├── utils/
│   │   └── prefetchIfStale.ts     # Prefetch utility for stale data
│   ├── routes.ts                  # Route configuration with prefetch functions
│   ├── entry-client.tsx           # Client-side entry point
│   ├── entry-server.tsx           # Server-side entry point
│   ├── App.tsx                    # Main application component
│   └── index.css                  # Global styles
├── server.ts                      # Express server configuration
├── vercel.json                    # Vercel deployment configuration
└── vite.config.ts                 # Vite configuration
```

## Architecture

### Server-Side Rendering (SSR)

The application uses Express to serve pre-rendered React components on the server:
- Initial HTML includes fully rendered content for better SEO
- React Query state is dehydrated and rehydrated on the client
- Styled Components styles are extracted and injected during SSR

### Routing

- **Client-side routing** with React Router v7
- **Active link detection** using NavLink component
- **Route prefetching** configured in `routes.ts` for optimal data loading
- Dynamic imports in prefetch functions to minimize bundle size

### Data Fetching

- Exchange rates are fetched from the CNB API
- React Query handles caching with a 1-hour stale time
- Prefetching occurs during SSR for the current route

## Deployment

The application is configured for deployment on Vercel:

- Serverless API route handles SSR at `/api`
- All routes are rewritten to the API handler
- Build output is in the `dist` directory

## Notes

This application was created as part of a technical test for a job interview. It demonstrates modern React development practices, TypeScript usage, SSR implementation, and deployment configuration.
