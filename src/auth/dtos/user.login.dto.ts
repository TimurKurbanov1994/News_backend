import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}
