import * as moment from "moment";
import {Commitment} from "../models/Commitment";
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
    const numberOfPeriods = endDate.diff(startDate, periodName) + 1;
    const periodsInYear = getPeriodsInYear(period);

    const valuePerPeriod = [];
    const labelPerPeriod = [];
    let previousYearAmount = 0;
    let currentAmount = 0;
    for (let index = 1; index <= numberOfPeriods; index++) {
        currentAmount += amountToPay + previousYearAmount * (annualReturn / 100.0) / periodsInYear;
        valuePerPeriod.push(Math.round((currentAmount) * 10000) / 10000);
        labelPerPeriod.push(getLabel(index, numberOfPeriods, start, periodName));
        if (index % periodsInYear === 0) {
            previousYearAmount = currentAmount;
        }
    }

    return {
        data: valuePerPeriod,
        labels: labelPerPeriod,
    };
}

export function getNextContributionDate(commitment: Commitment): string {
    const startDate = moment(commitment.createdAt * 1000);
    const periodName = getPeriodName(commitment.period);
    return startDate.add(1, periodName).format("DD MMM YYYY");
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

function getPeriodsInYear(period: 0 | 1 | 2): number {
    switch (period) {
        case 0:
            return 52;
        case 1:
            return 12;
        case 2:
            return 4;
        default:
            return 12;
    }
}

function getLabel(index: number, iterations: number, startDate: number, periodName: DurationConstructor): string {
    return moment(startDate * 1000).add(index - 1, periodName).format("DD-MM-YYYY");
}
