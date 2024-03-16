import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateOrphanageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly contact_number: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly owners_name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly owners_contact_number: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly orphan_count: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly staff_count: number;
}
