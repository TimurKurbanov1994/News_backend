import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from './entity/user.entity';
import { UserSignUpDto } from './dtos/user.sign-up.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    public usersRepository: Repository<UserEntity>,
    public jwtService: JwtService,
  ) {}

  public async signUp(user: UserSignUpDto): Promise<UserEntity> {
    const { email } = user;
    const candidate = await this.usersRepository.findOne({
      where: [{ email }],
    });
    if (candidate) {
      throw new BadRequestException('The user with this email is existed');
    }

    const newUser = this.usersRepository.create({
      email: user.email,
      password: user.password,
      name: user.name,
    });

    return this.usersRepository.save(newUser);
  }

  public async login({ email, password }: UserLoginDto) {
    const userLogin = await this.usersRepository.findOne({ email });

    if (!Boolean(userLogin)) {
      throw new BadRequestException('Incorrect auth');
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      throw new BadRequestException('Incorrect password');
    }
    const token = await this.createToken(email);

    return Object.assign(userLogin, { token });
  }

  private async createToken(email: string): Promise<string> {
    const payload = {
      email,
      initialTokenIat: new Date().getTime() / 1000,
    };

    const expiresIn = Math.ceil((60 * 1000 * 30) / 1000);

    return this.jwtService.sign(
      { payload },
      {
        expiresIn,
      },
    );
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getAllUsers(): Promise<any> {
    return await this.usersRepository.find();
  }

  async resetPassword({ email, password }: ResetPasswordDto) {
    const user = await this.usersRepository.findOne({
      where: [{ email }],
    });
    if (!Boolean(user)) {
      throw new BadRequestException('Invalid email');
    }
    user.password = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS),
    );
    return this.usersRepository.save(user);
  }
}
