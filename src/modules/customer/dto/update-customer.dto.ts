import {
  IsNotEmpty,
  IsDateString,
  IsEmail,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  dob: string;
}
