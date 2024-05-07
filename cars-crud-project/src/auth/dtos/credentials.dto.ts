import { IsEmail, IsString } from "class-validator";

export class CredentialDto {
    @IsEmail()
    email: string;

    @IsString() 
    password: string;
}