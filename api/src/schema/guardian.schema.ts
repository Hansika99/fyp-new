import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Guardian {
  @Prop()
  name: string;

  @Prop()
  relation_to_orphan: string;

  @Prop()
  contact_number: number;

  @Prop()
  address: string;
}
export const GuardianSchema = SchemaFactory.createForClass(Guardian);
