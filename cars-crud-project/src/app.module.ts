import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './cars/entities/cars.entity';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { InsuranceModule } from './insurance/insurance.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FeautureModule } from './feauture/feauture.module';



@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    //We need to use for root async because an instance of configService is needed for the connection configuration object to load the env variables dynamically
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          // Only used in development to allow the databse to reflect the changes in the backend
          synchronize: true,
          // entities: [Product],
          autoLoadEntities: true,
        };
      },
    }),
    CarsModule,
    ManufacturerModule,
    InsuranceModule,
    AuthModule,
    UsersModule,
    FeautureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
