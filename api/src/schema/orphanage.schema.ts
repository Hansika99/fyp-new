import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Orphanage {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  contact_number: number;

  @Prop()
  owners_name: string;

  @Prop()
  owners_contact_number: number;

  @Prop()
  orphan_count: number;

  @Prop()
  staff_count: number;
}
export const OrphanageSchema = SchemaFactory.createForClass(Orphanage);
