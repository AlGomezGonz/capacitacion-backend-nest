import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { HumansModule } from './humans/humans.module';
import { PetsModule } from './pets/pets.module';
import { humanMiddleware } from './common/middleware/human.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth/auth.interceptor';
import dbconfig from './database/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(dbconfig as TypeOrmModuleOptions),
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
