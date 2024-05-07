import { Controller, Body, HttpCode, HttpStatus, Post, Res, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CredentialDto } from './dtos/credentials.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    registerUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async loginUser(@Body() credentials: CredentialDto, @Res() res: Response) {
        const token = await this.authService.loginUser(credentials);

        res.set('access-token', token);

        res.sendStatus(200);
    }
 }
