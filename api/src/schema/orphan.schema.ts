import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';
import {
  EducationInformation,
  GuardianInformation,
  HealthInformation,
  PersonalInformation,
} from 'src/dto/create-orphan.dto';
@Schema()
export class Orphan {
  @Prop({ type: Date })
  dateFound: Date;
  @Prop()
  howFound: string;
  @Prop({ type: PersonalInformation })
  personalInformation: PersonalInformation;
  @Prop({ type: GuardianInformation })
  guardianInformation: GuardianInformation;
  @Prop({ type: EducationInformation })
  educationInformation: EducationInformation;
  @Prop({ type: HealthInformation })
  healthInformation: HealthInformation;
}
export const OrphanSchema = SchemaFactory.createForClass(Orphan);
