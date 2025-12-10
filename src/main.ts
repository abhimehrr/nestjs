import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ENV } from './config/env.validation';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ExceptionFilter } from './common/filters/exception.filter';

// Nest App with Fastify
async function App() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: false,
    },
  );

  // Enabling CORS
  app.enableCors({
    origin: (origin, cb) => {
      // Allow All Origins in Development
      if (
        origin === undefined ||
        ENV.SYSTEM.NODE_ENV === 'development' ||
        ENV.CORS.ALLOWED_ORIGINS.includes(origin)
      ) {
        return cb(null, true);
      }
      return cb(
        new Error(
          '🔐 CORS: Nice try, but nope. You are not in our guest list. 🥺',
        ),
        false,
      );
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  // Global Interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Global Exception Filters
  app.useGlobalFilters(new ExceptionFilter());

  // Start the Server
  const PORT = ENV.SYSTEM.PORT;
  await app.listen(PORT, () => {
    console.log(
      `Server Running as ${ENV.SYSTEM.NODE_ENV} @ http://localhost:${PORT}`,
    );
    // console.log(`Allowed CORS Origins: `, ENV.CORS.ALLOWED_ORIGINS);
  });
}

// Starting the Server
App().catch((err) =>
  console.error(
    'ERROR WHILE STARTING THE SERVER: ',
    JSON.parse(JSON.stringify(err)),
  ),
);
