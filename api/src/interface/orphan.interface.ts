import { Document } from 'mongoose';
import {
  PersonalInformation,
  GuardianInformation,
  EducationInformation,
  HealthInformation,
} from 'src/dto/create-orphan.dto';

export interface IOrphan extends Document {
  readonly dateFound: Date;

  readonly howFound: string;

  readonly personalInformation: PersonalInformation;

  readonly guardianInformation: GuardianInformation;

  readonly educationInformation: EducationInformation;

  readonly healthInformation: HealthInformation;
}
