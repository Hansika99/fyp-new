import { Document } from 'mongoose';

export interface IDonation extends Document {
  readonly date: Date;
  readonly type: string;
  readonly amount: number;
  readonly meal_time: string;
  readonly visiting_time: string;
}
