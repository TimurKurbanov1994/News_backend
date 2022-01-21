import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserSignUpDto } from './dtos/user.sign-up.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth';

@Controller()
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() user: UserSignUpDto): Promise<UserSignUpDto> {
    return await this.authServices.signUp(user);
  }

  @Post('login')
  public async login(@Body() user): Promise<UserLoginDto & { token: string }> {
    return await this.authServices.login(user);
  }

  @Get('users')
  getAll() {
    return this.authServices.getAllUsers();
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch('/reset')
  async resetPassword(@Body() user: ResetPasswordDto): Promise<any> {
    return await this.authServices.resetPassword(user);
  }
}
