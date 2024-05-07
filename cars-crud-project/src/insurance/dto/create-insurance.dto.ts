import { IsString, IsOptional } from "class-validator";

export class CreateInsuranceDto {
    @IsString()
    policyNumber: string;

    @IsString()
    provider: string;

    @IsString()
    coverageDetails: string;

    @IsString()
    @IsOptional()
    cars: string;
}