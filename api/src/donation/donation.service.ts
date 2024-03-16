import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IDonation } from 'src/interface/donation.interface';
import { Model } from 'mongoose';
import { UpdateDonationDto } from 'src/dto/update-donation.dto';
import { CreateDonationDto } from 'src/dto/create-donation.dto';
@Injectable()
export class DonationService {
  constructor(
    @InjectModel('Donation') private donationModel: Model<IDonation>,
  ) {}
  async createDonation(
    createDonationDto: CreateDonationDto,
  ): Promise<IDonation> {
    const newDonation = await new this.donationModel(createDonationDto);
    return newDonation.save();
  }
  async updateDonation(
    donationId: string,
    updateDonationDto: UpdateDonationDto,
  ): Promise<IDonation> {
    const existingDonation = await this.donationModel.findByIdAndUpdate(
      donationId,
      updateDonationDto,
      { new: true },
    );
    if (!existingDonation) {
      throw new NotFoundException(`donation #${donationId} not found`);
    }
    return existingDonation;
  }
  async getAllDonations(): Promise<IDonation[]> {
    const donationData = await this.donationModel.find();
    if (!donationData || donationData.length == 0) {
      throw new NotFoundException('donations data not found!');
    }
    return donationData;
  }
  async getDonation(donationId: string): Promise<IDonation> {
    const existingDonation = await this.donationModel
      .findById(donationId)
      .exec();
    if (!existingDonation) {
      throw new NotFoundException(`donation #${donationId} not found`);
    }
    return existingDonation;
  }
  async deleteDonation(donationId: string): Promise<IDonation> {
    const deletedDonation =
      await this.donationModel.findByIdAndDelete(donationId);
    if (!deletedDonation) {
      throw new NotFoundException(`donation #${donationId} not found`);
    }
    return deletedDonation;
  }
}
