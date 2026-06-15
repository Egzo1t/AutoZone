import Fastify from 'fastify';
import cors from '@fastify/cors';
import { healthRoute } from './routes/health.route.js';
import { productRoutes } from './routes/product.routes.js';
import { orderRoutes } from './routes/order.routes.js';
import { HttpError } from './utils/httpError.js';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: true,
  });

  app.setErrorHandler((error, req, reply) => {
  const statusCode =
    error instanceof HttpError ? error.statusCode : 500;

  const message =
    error instanceof Error ? error.message : "Internal Server Error";

  return reply.status(statusCode).send({
    success: false,
    message,
  });
});

  await app.register(healthRoute);
  await app.register(productRoutes);
  await app.register(orderRoutes);
  
  return app;
}
