import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvType } from './env.validation';

// Config Module
@Module({
  imports: [
    ConfigModule.forRoot<EnvType>({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}
