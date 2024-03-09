import { Document } from 'mongoose';

export interface IGuardian extends Document {
  readonly name: string;
  readonly relation_to_orphan: string;
  readonly contact_number: number;
  readonly address: string;
}
