import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateDonationDto } from 'src/dto/create-donation.dto';
import { UpdateDonationDto } from 'src/dto/update-donation.dto';
import { DonationService } from 'src/donation/donation.service';
@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}
  @Post()
  async createDonation(
    @Res() response,
    @Body() createDonationDto: CreateDonationDto,
  ) {
    try {
      const newDonation =
        await this.donationService.createDonation(createDonationDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Donation has been created successfully',
        newDonation,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Donation not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateDonation(
    @Res() response,
    @Param('id') donationId: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    try {
      const existingDonation = await this.donationService.updateDonation(
        donationId,
        updateDonationDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Donation has been successfully updated',
        existingDonation,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getDonations(@Res() response) {
    try {
      const donationData = await this.donationService.getAllDonations();
      return response.status(HttpStatus.OK).json({
        message: 'All donations data found successfully',
        donationData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getDonation(@Res() response, @Param('id') donationId: string) {
    try {
      const existingDonation =
        await this.donationService.getDonation(donationId);
      return response.status(HttpStatus.OK).json({
        message: 'Donation found successfully',
        existingDonation,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteDonation(@Res() response, @Param('id') donationId: string) {
    try {
      const deletedDonation =
        await this.donationService.deleteDonation(donationId);
      return response.status(HttpStatus.OK).json({
        message: 'Donation deleted successfully',
        deletedDonation,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
