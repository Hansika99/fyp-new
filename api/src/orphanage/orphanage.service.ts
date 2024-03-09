import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IOrphanage } from 'src/interface/orphanage.interface';
import { Model } from 'mongoose';
import { UpdateOrphanageDto } from 'src/dto/update-orphanage.dto';
import { CreateOrphanageDto } from 'src/dto/create-orphanage.dto';
@Injectable()
export class OrphanageService {
  constructor(
    @InjectModel('Orphanage') private orphanageModel: Model<IOrphanage>,
  ) {}
  async createOrphanage(
    createOrphanageDto: CreateOrphanageDto,
  ): Promise<IOrphanage> {
    const newOrphanage = await new this.orphanageModel(createOrphanageDto);
    return newOrphanage.save();
  }
  async updateOrphanage(
    orphanageId: string,
    updateOrphanageDto: UpdateOrphanageDto,
  ): Promise<IOrphanage> {
    const existingOrphanage = await this.orphanageModel.findByIdAndUpdate(
      orphanageId,
      updateOrphanageDto,
      { new: true },
    );
    if (!existingOrphanage) {
      throw new NotFoundException(`orphanage #${orphanageId} not found`);
    }
    return existingOrphanage;
  }
  async getAllOrphanages(): Promise<IOrphanage[]> {
    const orphanageData = await this.orphanageModel.find();
    if (!orphanageData || orphanageData.length == 0) {
      throw new NotFoundException('orphanages data not found!');
    }
    return orphanageData;
  }
  async getOrphanage(orphanageId: string): Promise<IOrphanage> {
    const existingOrphanage = await this.orphanageModel
      .findById(orphanageId)
      .exec();
    if (!existingOrphanage) {
      throw new NotFoundException(`orphanage #${orphanageId} not found`);
    }
    return existingOrphanage;
  }
  async deleteOrphanage(orphanageId: string): Promise<IOrphanage> {
    const deletedOrphanage =
      await this.orphanageModel.findByIdAndDelete(orphanageId);
    if (!deletedOrphanage) {
      throw new NotFoundException(`orphanage #${orphanageId} not found`);
    }
    return deletedOrphanage;
  }
}
