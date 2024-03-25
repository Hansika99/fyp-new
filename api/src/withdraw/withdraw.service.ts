import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IWithdraw } from 'src/interface/withdraw.interface';
import { Model } from 'mongoose';
import { UpdateWithdrawDto } from 'src/dto/update-withdraw.dto';
import { CreateWithdrawDto } from 'src/dto/create-withdraw.dto';
@Injectable()
export class WithdrawService {
  constructor(
    @InjectModel('Withdraw') private withdrawModel: Model<IWithdraw>,
  ) {}
  async createWithdraw(
    createWithdrawDto: CreateWithdrawDto,
  ): Promise<IWithdraw> {
    // Set the current date to the withdrawDate field
    createWithdrawDto.withdrawalDate = new Date();
    const newWithdraw = await new this.withdrawModel(createWithdrawDto);
    return newWithdraw.save();
  }
  async updateWithdraw(
    withdrawId: string,
    updateWithdrawDto: UpdateWithdrawDto,
  ): Promise<IWithdraw> {
    const existingWithdraw = await this.withdrawModel.findByIdAndUpdate(
      withdrawId,
      updateWithdrawDto,
      { new: true },
    );
    if (!existingWithdraw) {
      throw new NotFoundException(`withdraw #${withdrawId} not found`);
    }
    return existingWithdraw;
  }
  async getAllWithdraws(): Promise<IWithdraw[]> {
    const withdrawData = await this.withdrawModel.find();
    if (!withdrawData || withdrawData.length == 0) {
      throw new NotFoundException('withdraws data not found!');
    }
    return withdrawData;
  }
  async getWithdraw(withdrawId: string): Promise<IWithdraw> {
    const existingWithdraw = await this.withdrawModel
      .findById(withdrawId)
      .exec();
    if (!existingWithdraw) {
      throw new NotFoundException(`withdraw #${withdrawId} not found`);
    }
    return existingWithdraw;
  }
  async deleteWithdraw(withdrawId: string): Promise<IWithdraw> {
    const deletedWithdraw =
      await this.withdrawModel.findByIdAndDelete(withdrawId);
    if (!deletedWithdraw) {
      throw new NotFoundException(`withdraw #${withdrawId} not found`);
    }
    return deletedWithdraw;
  }
}
