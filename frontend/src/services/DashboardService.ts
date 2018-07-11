import * as moment from "moment";
import DurationConstructor = moment.unitOfTime.DurationConstructor;

export function prepareChartData(
    start: number,
    durationInYears: number,
    amountToPay: number,
    period: 0 | 1 | 2,
    annualReturn: number) {

    const startDate = moment(start * 1000);
    const endDate = moment(start * 1000).add(durationInYears, "years");
    const periodName = getPeriodName(period);
    const numberOfPeriods = endDate.diff(startDate, periodName);

    const valuePerPeriod = [];
    const labelPerPeriod = [];
    for (let index = 1; index <= numberOfPeriods; index++) {
        valuePerPeriod.push(Math.round((index * amountToPay) * 10000) / 10000);
        labelPerPeriod.push(getLabel(index, numberOfPeriods, start, periodName));
    }

    return {
        data: valuePerPeriod,
        labels: labelPerPeriod,
    };
}

function getPeriodName(period: 0 | 1 | 2): DurationConstructor {
    switch (period) {
        case 0:
            return "week";
        case 1:
            return "month";
        case 2:
            return "quarter";
        default:
            return "month";
    }
}

function getLabel(index: number, iterations: number, startDate: number, periodName: DurationConstructor): string {
    if (index === 1) {
        return "commitment start";
    } else if (index === iterations) {
        return "commitment end";
    } else {
        return moment(startDate * 1000).add(index - 1, periodName).format("DD-MM-YYYY");
    }
}
