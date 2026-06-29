import dotenv from 'dotenv';
import app from './app.js';

// Load configuration parameters
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`[TechVistar Server] Running in ${NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(`[Fatal] Unhandled Promise Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('[Info] SIGTERM received. Shutting down server gracefully');
  server.close(() => process.exit(0));
});
