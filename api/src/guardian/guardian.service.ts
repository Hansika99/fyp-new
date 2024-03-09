import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGuardianDto } from 'src/dto/create-guardian.dto';
import { IGuardian } from 'src/interface/guardian.interface';
import { Model } from 'mongoose';
import { UpdateGuardianDto } from 'src/dto/update-guardian.dto';
@Injectable()
export class GuardianService {
  constructor(
    @InjectModel('Guardian') private guardianModel: Model<IGuardian>,
  ) {}
  async createGuardian(
    createGuardianDto: CreateGuardianDto,
  ): Promise<IGuardian> {
    const newGuardian = await new this.guardianModel(createGuardianDto);
    return newGuardian.save();
  }
  async updateGuardian(
    guardianId: string,
    updateGuardianDto: UpdateGuardianDto,
  ): Promise<IGuardian> {
    const existingGuardian = await this.guardianModel.findByIdAndUpdate(
      guardianId,
      updateGuardianDto,
      { new: true },
    );
    if (!existingGuardian) {
      throw new NotFoundException(`guardian #${guardianId} not found`);
    }
    return existingGuardian;
  }
  async getAllGuardians(): Promise<IGuardian[]> {
    const guardianData = await this.guardianModel.find();
    if (!guardianData || guardianData.length == 0) {
      throw new NotFoundException('guardians data not found!');
    }
    return guardianData;
  }
  async getGuardian(guardianId: string): Promise<IGuardian> {
    const existingGuardian = await this.guardianModel
      .findById(guardianId)
      .exec();
    if (!existingGuardian) {
      throw new NotFoundException(`guardian #${guardianId} not found`);
    }
    return existingGuardian;
  }
  async deleteGuardian(guardianId: string): Promise<IGuardian> {
    const deletedGuardian =
      await this.guardianModel.findByIdAndDelete(guardianId);
    if (!deletedGuardian) {
      throw new NotFoundException(`guardian #${guardianId} not found`);
    }
    return deletedGuardian;
  }
}
