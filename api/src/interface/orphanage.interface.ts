import { Document } from 'mongoose';

export interface IOrphanage extends Document {
  readonly name: string;
  readonly address: string;
  readonly contact_number: number;
  readonly owners_name: string;
  readonly owners_contact_number: number;
  readonly orphan_count: number;
  readonly staff_count: number;
}
