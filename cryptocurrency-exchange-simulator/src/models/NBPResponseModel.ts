import { NBPRateModel } from '@/models/NBPRateModel'

export interface NBPResponseModel {
  table: string;
  no: string;
  tradingDate: Date;
  effectiveDate: Date;
  rates: Array<NBPRateModel>;
}
