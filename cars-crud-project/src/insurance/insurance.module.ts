import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { CarsModule } from 'src/cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsInsurance } from './entities/insurance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarsInsurance]), CarsModule],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}