import Fastify from 'fastify';
import cors from '@fastify/cors';
import { healthRoute } from './routes/health.route.js';
import { productRoutes } from './routes/product.routes.js';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: true,
  });

  await app.register(healthRoute);
  await app.register(productRoutes);
  
  return app;
}
