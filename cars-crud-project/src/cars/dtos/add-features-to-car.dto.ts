import { IsString } from "class-validator";

export class AddFeaturesToCars {
    @IsString()
    feature: string;
}