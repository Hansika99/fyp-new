import { Document } from 'mongoose';

export interface IWithdraw extends Document {
  readonly amount: number;
  readonly reason: string;
}
