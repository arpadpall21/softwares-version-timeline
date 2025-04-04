export enum Software {
  CHROME = 'CHROME',
  FIREFOX = 'FIREFOX',
}

export interface Lang {
  langCode: string;
  lang: string;
}

export type VersionHistoryData = {    // TODO
  date: string;
  version: string;
}[][];

export type Months = {
  yearMonth: string;
  monthName: string;
}[];
