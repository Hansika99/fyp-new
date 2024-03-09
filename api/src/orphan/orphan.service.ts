import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrphanDto } from 'src/dto/create-orphan.dto';
import { IOrphan } from 'src/interface/orphan.interface';
import { Model } from 'mongoose';
import { UpdateOrphanDto } from 'src/dto/update-orphan.dto';
@Injectable()
export class OrphanService {
  constructor(@InjectModel('Orphan') private orphanModel: Model<IOrphan>) {}
  async createOrphan(createOrphanDto: CreateOrphanDto): Promise<IOrphan> {
    const newOrphan = await new this.orphanModel(createOrphanDto);
    return newOrphan.save();
  }
  async updateOrphan(
    orphanId: string,
    updateOrphanDto: UpdateOrphanDto,
  ): Promise<IOrphan> {
    const existingOrphan = await this.orphanModel.findByIdAndUpdate(
      orphanId,
      updateOrphanDto,
      { new: true },
    );
    if (!existingOrphan) {
      throw new NotFoundException(`orphan #${orphanId} not found`);
    }
    return existingOrphan;
  }
  async getAllOrphans(): Promise<IOrphan[]> {
    const orphanData = await this.orphanModel.find();
    if (!orphanData || orphanData.length == 0) {
      throw new NotFoundException('orphans data not found!');
    }
    return orphanData;
  }
  async getOrphan(orphanId: string): Promise<IOrphan> {
    const existingOrphan = await this.orphanModel.findById(orphanId).exec();
    if (!existingOrphan) {
      throw new NotFoundException(`orphan #${orphanId} not found`);
    }
    return existingOrphan;
  }
  async deleteOrphan(orphanId: string): Promise<IOrphan> {
    const deletedOrphan = await this.orphanModel.findByIdAndDelete(orphanId);
    if (!deletedOrphan) {
      throw new NotFoundException(`orphan #${orphanId} not found`);
    }
    return deletedOrphan;
  }
}
