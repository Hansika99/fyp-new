import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateDonationDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly type: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly meal_time: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly visiting_time: string;
}
