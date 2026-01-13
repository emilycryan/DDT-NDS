# CDC: Path2Prevention Application

A prototype for the new CDC: Path2Prevention platform

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd /Users/63172/DAIS/DDT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file (optional):
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your actual environment variables.

### Development

To start the development server with both frontend and backend:

```bash
npm run dev
```

This will start:
- Frontend (React + Vite) on http://localhost:3003
- Backend (Express API) on http://localhost:3004

### Individual Commands

Start only the frontend:
```bash
npm run dev:vite
```

Start only the backend:
```bash
npm run dev:api
```

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Project Structure

```
DDT/
├── public/          # Static assets
├── src/             # React application source
│   ├── App.jsx      # Main application component
│   ├── App.css      # App-specific styles
│   ├── index.css    # Global styles
│   └── main.jsx     # Application entry point
├── server.js        # Express backend server
├── vite.config.js   # Vite configuration
└── package.json     # Dependencies and scripts
```

## API Endpoints

The backend server provides the following endpoints:

- `GET /api/hello` - Simple hello message
- `GET /api/health` - Health check endpoint
- `POST /api/data` - Sample POST endpoint

## Technology Stack

- **Frontend**: React 19, Vite 7
- **Backend**: Express 5
- **Styling**: CSS with modern design patterns
- **Development**: ESLint, Hot Module Replacement
- **UI Components**: Material-UI (MUI) ready

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:vite` - Start only the frontend development server
- `npm run dev:api` - Start only the backend API server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build

## Port Configuration

- Frontend: Port 3003
- Backend API: Port 3004

## Contributing

1. Make your changes
2. Run `npm run lint` to check for issues
3. Test your changes locally with `npm run dev`
4. Submit your changes

## License

This project is private and proprietary.
