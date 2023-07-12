import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { HumansModule } from './humans/humans.module';
import { PetsModule } from './pets/pets.module';
import { humanMiddleware } from './common/middleware/human.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth/auth.interceptor';

config();

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: configService.get('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    HumansModule,
    PetsModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer) {
    consumer.apply(humanMiddleware).forRoutes('humans/:id*');
  }
}
