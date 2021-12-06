import { IsEmail, IsString } from 'class-validator';

export class UserSignUpDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly password: string;
}
