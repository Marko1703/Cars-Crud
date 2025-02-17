import { IsArray, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateManufacturerDto {
    @IsString()
    name: string;

    @IsString()
    headquarters: string;
}