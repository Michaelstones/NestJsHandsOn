import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseEnumPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportType } from '../data';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly appService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.getReportById(id, reportType);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type') type: string,
  ): ReportResponseDto {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;

    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): object {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;

    return this.appService.updateReport(reportType, body, id);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
