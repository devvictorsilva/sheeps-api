import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'A senha não deve ser vazia.' })
  password: string;
}