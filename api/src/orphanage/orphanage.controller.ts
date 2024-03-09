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
import { CreateOrphanageDto } from 'src/dto/create-orphanage.dto';
import { UpdateOrphanageDto } from 'src/dto/update-orphanage.dto';
import { OrphanageService } from 'src/orphanage/orphanage.service';
@Controller('orphanage')
export class OrphanageController {
  constructor(private readonly orphanageService: OrphanageService) {}
  @Post()
  async createOrphanage(
    @Res() response,
    @Body() createOrphanageDto: CreateOrphanageDto,
  ) {
    try {
      const newOrphanage =
        await this.orphanageService.createOrphanage(createOrphanageDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Orphanage has been created successfully',
        newOrphanage,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Orphanage not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateOrphanage(
    @Res() response,
    @Param('id') orphanageId: string,
    @Body() updateOrphanageDto: UpdateOrphanageDto,
  ) {
    try {
      const existingOrphanage = await this.orphanageService.updateOrphanage(
        orphanageId,
        updateOrphanageDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Orphanage has been successfully updated',
        existingOrphanage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getOrphanages(@Res() response) {
    try {
      const orphanageData = await this.orphanageService.getAllOrphanages();
      return response.status(HttpStatus.OK).json({
        message: 'All orphanages data found successfully',
        orphanageData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getOrphanage(@Res() response, @Param('id') orphanageId: string) {
    try {
      const existingOrphanage =
        await this.orphanageService.getOrphanage(orphanageId);
      return response.status(HttpStatus.OK).json({
        message: 'Orphanage found successfully',
        existingOrphanage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteOrphanage(@Res() response, @Param('id') orphanageId: string) {
    try {
      const deletedOrphanage =
        await this.orphanageService.deleteOrphanage(orphanageId);
      return response.status(HttpStatus.OK).json({
        message: 'Orphanage deleted successfully',
        deletedOrphanage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
