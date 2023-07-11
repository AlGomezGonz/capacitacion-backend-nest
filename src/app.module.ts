import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { HumansModule } from './humans/humans.module';
import { PetsModule } from './pets/pets.module';
import { humanMiddleware } from './common/middleware/human.middleware';

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
  ],
})
export class AppModule {
  configure(consumer) {
    consumer.apply(humanMiddleware).forRoutes('humans/:id*');
  }
}
