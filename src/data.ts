/* eslint-disable prettier/prettier */
export enum ReportType {
    EXPENSE = 'expense',
    INCOME='income'
}

export const data: Data = {
    report: [
        {
        id: 'uuid1',
        source: 'salary',
        amount: 7500,
        created_At:new Date(),
        updated_At:new Date(),
        type: ReportType.INCOME
        },
        {
        id: 'uuid2',
        source: 'youtube',
        amount: 1300,
        created_At:new Date(),
        updated_At:new Date(),
        type: ReportType.INCOME
        },
        {
        id: 'uuid3',
        source: 'food',
        amount: 750,
        created_At:new Date(),
        updated_At:new Date(),
        type: ReportType.EXPENSE
      }
  ],
};

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_At: Date;
    updated_At: Date;
    type: ReportType
  }[];
}

