import { IsNumber, IsString, IsArray, Length, Min, IsOptional } from "class-validator";
import { CarsInsurance } from "src/insurance/entities/insurance.entity";
import { Manufacturer } from "src/manufacturer/entities/manufacturer.entity";
import { DeepPartial } from "typeorm";

export class CreateCarsDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsOptional()
  manufacturer: DeepPartial<Manufacturer>;

  @IsString()
  @IsOptional()
  insurance: DeepPartial<CarsInsurance>;
}