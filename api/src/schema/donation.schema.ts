import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';
@Schema()
export class Donation {
  @Prop({ type: Date })
  date: Date;

  @Prop()
  type: string;

  @Prop()
  amount: number;

  @Prop()
  meal_time: string;

  @Prop()
  visiting_time: string;

  @Prop()
  donor_name: string;

  @Prop()
  donor_contact: string;

  @Prop()
  orphanage: string;
}
export const DonationSchema = SchemaFactory.createForClass(Donation);
