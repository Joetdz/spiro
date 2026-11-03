import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Charge apps/api/.env s'il existe (les variables déjà définies restent prioritaires).
try {
  process.loadEnvFile('.env');
} catch {
  // Pas de fichier .env : on utilise uniquement l'environnement.
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? 'http://localhost:3001').split(','),
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
  console.log(`API Spiro RDC : http://localhost:${port}/api`);
}

bootstrap();
