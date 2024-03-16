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
import { CreateOrphanDto } from 'src/dto/create-orphan.dto';
import { UpdateOrphanDto } from 'src/dto/update-orphan.dto';
import { OrphanService } from 'src/orphan/orphan.service';
@Controller('orphan')
export class OrphanController {
  constructor(private readonly orphanService: OrphanService) {}
  @Post()
  async createOrphan(
    @Res() response,
    @Body() createOrphanDto: CreateOrphanDto,
  ) {
    try {
      const newOrphan = await this.orphanService.createOrphan(createOrphanDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Orphan has been created successfully',
        newOrphan,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Orphan not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateOrphan(
    @Res() response,
    @Param('id') orphanId: string,
    @Body() updateOrphanDto: UpdateOrphanDto,
  ) {
    try {
      const existingOrphan = await this.orphanService.updateOrphan(
        orphanId,
        updateOrphanDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Orphan has been successfully updated',
        existingOrphan,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getOrphans(@Res() response) {
    try {
      const orphanData = await this.orphanService.getAllOrphans();
      return response.status(HttpStatus.OK).json({
        message: 'All orphans data found successfully',
        orphanData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getOrphan(@Res() response, @Param('id') orphanId: string) {
    try {
      const existingOrphan = await this.orphanService.getOrphan(orphanId);
      return response.status(HttpStatus.OK).json({
        message: 'Orphan found successfully',
        existingOrphan,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteOrphan(@Res() response, @Param('id') orphanId: string) {
    try {
      const deletedOrphan = await this.orphanService.deleteOrphan(orphanId);
      return response.status(HttpStatus.OK).json({
        message: 'Orphan deleted successfully',
        deletedOrphan,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
