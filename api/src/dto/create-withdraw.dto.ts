import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateWithdrawDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly reason: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  withdrawalDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly to_wallet: string;
}
