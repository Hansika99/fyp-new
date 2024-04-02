import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class EducationInformation {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly gradeClass: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly hobbiesInterests: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly schoolName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly specialNeeds: string;
}

export class GuardianInformation {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly guardianName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly relationship: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly contactNumber: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly guardianAddress: string;
}

export class HealthInformation {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly allergies: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly medications: string;
}

export class PersonalInformation {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly dateOfBirth: Date;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty()
  readonly gender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly birthCity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly placeOfBirth: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nationality: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly religion: string;
}

export class CreateOrphanDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly dateFound: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly howFound: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly orphanage: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PersonalInformation)
  readonly personalInformation: PersonalInformation;

  @IsObject()
  @ValidateNested()
  @Type(() => GuardianInformation)
  readonly guardianInformation: GuardianInformation;

  @IsObject()
  @ValidateNested()
  @Type(() => EducationInformation)
  readonly educationInformation: EducationInformation;

  @IsObject()
  @ValidateNested()
  @Type(() => HealthInformation)
  readonly healthInformation: HealthInformation;
}
