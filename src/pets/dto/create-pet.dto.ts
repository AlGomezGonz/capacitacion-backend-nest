import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
