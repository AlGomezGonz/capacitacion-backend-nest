import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHumanDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
