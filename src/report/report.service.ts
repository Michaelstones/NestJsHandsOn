import { Injectable } from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from 'src/dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(id: string, type: ReportType): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!report) return;
    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      amount: amount,
      source: source,
      created_At: new Date(),
      updated_At: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }
  updateReport(type: ReportType, body: UpdateReport, id: string) {
    const queriedData = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!queriedData) return;
    const reportIndex = data.report.findIndex(
      (report) => report.id === queriedData.id,
    );
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_At: new Date(),
    };
    return { success: true, updated: data.report[reportIndex] };
  }

  deleteReport(id: string) {
    const index = data.report.findIndex((report) => report.id === id);
    if (index == -1) return;
    data.report.splice(index, 1);
    return;
  }
}
