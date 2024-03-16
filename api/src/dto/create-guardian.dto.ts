import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateGuardianDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  readonly relation_to_orphan: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly contact_number: number;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  readonly address: string;
}
