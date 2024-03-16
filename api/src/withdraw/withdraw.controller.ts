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
import { CreateWithdrawDto } from 'src/dto/create-withdraw.dto';
import { UpdateWithdrawDto } from 'src/dto/update-withdraw.dto';
import { WithdrawService } from 'src/withdraw/withdraw.service';
@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}
  @Post()
  async createWithdraw(
    @Res() response,
    @Body() createWithdrawDto: CreateWithdrawDto,
  ) {
    try {
      const newWithdraw =
        await this.withdrawService.createWithdraw(createWithdrawDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Withdraw has been created successfully',
        newWithdraw,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Withdraw not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateWithdraw(
    @Res() response,
    @Param('id') withdrawId: string,
    @Body() updateWithdrawDto: UpdateWithdrawDto,
  ) {
    try {
      const existingWithdraw = await this.withdrawService.updateWithdraw(
        withdrawId,
        updateWithdrawDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Withdraw has been successfully updated',
        existingWithdraw,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getWithdraws(@Res() response) {
    try {
      const withdrawData = await this.withdrawService.getAllWithdraws();
      return response.status(HttpStatus.OK).json({
        message: 'All withdraws data found successfully',
        withdrawData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getWithdraw(@Res() response, @Param('id') withdrawId: string) {
    try {
      const existingWithdraw =
        await this.withdrawService.getWithdraw(withdrawId);
      return response.status(HttpStatus.OK).json({
        message: 'Withdraw found successfully',
        existingWithdraw,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteWithdraw(@Res() response, @Param('id') withdrawId: string) {
    try {
      const deletedWithdraw =
        await this.withdrawService.deleteWithdraw(withdrawId);
      return response.status(HttpStatus.OK).json({
        message: 'Withdraw deleted successfully',
        deletedWithdraw,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
