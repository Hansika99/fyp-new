import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';
@Schema()
export class Withdraw {
 


  @Prop()
  amount: number;



  @Prop()
  reason: string;
}
export const WithdrawSchema = SchemaFactory.createForClass(Withdraw);
