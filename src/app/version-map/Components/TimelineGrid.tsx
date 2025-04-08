'use client';

import { useMemo } from 'react';
import { type VersionHistoryData, type Month } from '@/misc/types';
import { calcPercentOf, calcMonthTimeline } from '@/misc/helpers';
import TextBallon from './TextBalloon';
import { useTranslations } from 'next-intl';

interface Props {
  months: Month[];
  versionHistoryData?: VersionHistoryData;
}

const TimelineGrid: React.FC<Props> = ({ months, versionHistoryData }) => {
  const t = useTranslations('components.monthsGrid.months');

  const timelineColor = 'lightgreen';

  const monthsWithTimeline = useMemo(() => {
    if (versionHistoryData) {
      return calcMonthTimeline(months, versionHistoryData);
    }

    return months;
  }, [months, versionHistoryData]);

  return (
    <div className={'flex h-[100px] bg-gridBg dark:bg-gridBgD'}>
      {monthsWithTimeline.map((month) => {
        return (
          <div className={'relative border-l border-borPri h-full w-gridCellW'} key={month.yearMonth}>
            {Array.isArray(versionHistoryData?.[month.yearMonth]) &&
              versionHistoryData[month.yearMonth].map((monthData) => (
                <div
                  className={'absolute bottom-[40px] z-10 hover:z-50'}
                  style={{ left: calcPercentOf(monthData.day, 31) }}
                  key={monthData.version}
                >
                  <div className={'left-[53%] translate-x-[-53%]'}>
                    <TextBallon
                      text={monthData.version}
                      textsSecondary={[`(${t(month.monthName)}. ${monthData.day})`]}
                      backgroundColor={timelineColor}
                    />
                  </div>
                </div>
              ))}
            {month.timeline && (
              <div
                className={'absolute bottom-[24px] h-2'}
                style={{
                  backgroundColor: timelineColor,
                  width: month.timeline.percent,
                  left: month.timeline.from === 'left' ? '-1px' : undefined,
                  right: month.timeline.from === 'right' ? '-1px' : undefined,
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TimelineGrid;
