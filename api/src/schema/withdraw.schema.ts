import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';
@Schema()
export class Withdraw {
 


  @Prop()
  amount: number;



  @Prop()
  reason: string;

  @Prop({ type: Date })
  withdrawalDate: Date;
}
export const WithdrawSchema = SchemaFactory.createForClass(Withdraw);
