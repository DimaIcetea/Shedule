import { ScheduleResponseType } from "./appAPIendpoints";

function generateEmptyData(
  period: number,
  day: number,
  time: number
): ScheduleResponseType {
  return {
    lesson: "",
    teacher: "",
    period: period,
    link: "",
    group: "",
    time: time,
    day: day,
  };
}
// const periods: ScheduleResponseType[][][] = Array(4)
//   .fill(undefined)
//   .map((_, indexOfPeriod) =>
//     Array(6)
//       .fill(undefined)
//       .map((_, indexOfDay) =>
//         Array(6)
//           .fill(undefined)
//           .map((_, indexOfTime) =>
//             generateEmptyData(indexOfPeriod, indexOfDay, indexOfTime)
//           )
//       )
//   );

export function transformScheduleData(data: ScheduleResponseType[]) {
  const array: ScheduleResponseType[][][] = Array(4)
    .fill(undefined)
    .map((_, indexOfPeriod) =>
      Array(6)
        .fill(undefined)
        .map((_, indexOfDay) =>
          Array(6)
            .fill(undefined)
            .map((_, indexOfTime) =>
              generateEmptyData(indexOfPeriod, indexOfDay, indexOfTime)
            )
        )
    );
  let numberOfPeriods = -1;
  data.forEach((val) => {
    array[val.period - 1][val.day - 1][val.time - 1] = val;
    if (val.period > numberOfPeriods) numberOfPeriods = val.period;
  });
  return { array, numberOfPeriods };
}
