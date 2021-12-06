import { IsEmail, IsString } from 'class-validator';

export class FbDto {
  @IsEmail()
  public email: string;

  @IsString()
  public text: string;
}
