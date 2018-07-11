export interface Commitment {
    amountToPay: number;
    createdAt: number;
    durationInYears: number;
    fundAddress: string;
    fundName: string;
    pastAnnualReturns: number;
    period: 0 | 1 | 2;
}

export function PrepareCommitment(response: any): Commitment {
    const commitment: Commitment = {
        amountToPay: 0,
        createdAt: 0,
        durationInYears: 0,
        fundAddress: "",
        fundName: "",
        pastAnnualReturns: 0,
        period: 0,
    };
    Object.keys(response).map((key) => commitment[key] = response[key].c ? response[key].c[0] : response[key]);
    return commitment;
}
