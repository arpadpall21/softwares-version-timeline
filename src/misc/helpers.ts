import { type Lang, type Months } from '@/misc/types';
import appConfig from '../../config/appConfig';

const minZoomLevel = appConfig.zoom.minLevel;
const maxZoomLevel = appConfig.zoom.maxLevel;
const zoomSensitivity = appConfig.zoom.sensitivity;

export function validLang(langCode: string = ''): Lang {
  return appConfig.lang.supportedLanguages[langCode]
    ? appConfig.lang.supportedLanguages[langCode]
    : appConfig.lang.defaultLanguage;
}

export function validTheme(theme: string = ''): string {
  return appConfig.theme.supportedThemes.includes(theme) ? theme : 'auto';
}

export function calcTimelineZoom(direction: 'zoomIn' | 'zoomOut', currentZoomLevel: number): number {
  if (direction === 'zoomIn') {
    return Math.max(currentZoomLevel - zoomSensitivity, minZoomLevel);
  }
  return Math.min(currentZoomLevel + zoomSensitivity, maxZoomLevel);
}

export function calcPercentOf(fraction: number, total: number = 100): number {
  return Math.floor((fraction / total) * 100);
}

export function calcMonthsUpToCurrent(startYear: number, startMonth: number = 1): Months {
  const result: Months = [];

  const monthMap: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const today = new Date();
  const endYear = today.getUTCFullYear();
  const endMonth = today.getUTCMonth() + 1;

  for (let year = startYear; year <= endYear; year++) {
    for (let month = year === startYear ? startMonth : 1; month <= (year === endYear ? endMonth : 12); month++) {
      result.push({ yearMonth: `${year}-${month.toString().padStart(2, '0')}`, monthName: monthMap[month - 1] });
    }
  }

  return result;
}
