import { IsString, Length, IsNumber, Min, IsOptional } from "class-validator";

export class UpdateCarsDto {
  @IsString()
  @Length(3, 30)
  @IsOptional()
  make: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsNumber()
  @IsOptional()
  year: number;
}