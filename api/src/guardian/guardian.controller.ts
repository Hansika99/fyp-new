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
import { CreateGuardianDto } from 'src/dto/create-guardian.dto';
import { UpdateGuardianDto } from 'src/dto/update-guardian.dto';
import { GuardianService } from 'src/guardian/guardian.service';
@Controller('guardian')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}
  @Post()
  async createGuardian(
    @Res() response,
    @Body() createGuardianDto: CreateGuardianDto,
  ) {
    try {
      const newGuardian =
        await this.guardianService.createGuardian(createGuardianDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Guardian has been created successfully',
        newGuardian,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Guardian not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateGuardian(
    @Res() response,
    @Param('id') guardianId: string,
    @Body() updateGuardianDto: UpdateGuardianDto,
  ) {
    try {
      const existingGuardian = await this.guardianService.updateGuardian(
        guardianId,
        updateGuardianDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Guardian has been successfully updated',
        existingGuardian,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getGuardians(@Res() response) {
    try {
      const guardianData = await this.guardianService.getAllGuardians();
      return response.status(HttpStatus.OK).json({
        message: 'All guardians data found successfully',
        guardianData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getGuardian(@Res() response, @Param('id') guardianId: string) {
    try {
      const existingGuardian =
        await this.guardianService.getGuardian(guardianId);
      return response.status(HttpStatus.OK).json({
        message: 'Guardian found successfully',
        existingGuardian,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteGuardian(@Res() response, @Param('id') guardianId: string) {
    try {
      const deletedGuardian =
        await this.guardianService.deleteGuardian(guardianId);
      return response.status(HttpStatus.OK).json({
        message: 'Guardian deleted successfully',
        deletedGuardian,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
