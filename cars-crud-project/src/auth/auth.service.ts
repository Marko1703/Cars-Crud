import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcryptjs'
import { CredentialDto } from './dtos/credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async registerUser(createUserDto: CreateUserDto) {
        const userExists = await this.userService.findByEmail(
            createUserDto.email,
        );

        if (userExists) throw new BadRequestException("Email already exists");

        const hashedPassword = await hash(createUserDto.password, 8);

        createUserDto.password = hashedPassword;

        await this.userService.create(createUserDto);
    }

    async loginUser(credentials: CredentialDto) {
        const user = await this.userService.findByEmail(credentials.email);

        if (!user) throw new UnauthorizedException('Invalid Credentials');

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid)
           throw new UnauthorizedException('Invalid Credentials');

        const accessToken = await this.jwtService.signAsync({ id: user.id });

        return accessToken;
    }
}
