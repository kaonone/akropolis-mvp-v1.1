export enum ProductRating {
    DEFENSIVE, BALANCED, AGGRESSIVE
}

export interface Product {
    fundAddress: string;
    fundDescription: string;
    fundName: string;
    fundPastReturns: string;
    fundReputation: string;
    fundRiskRating: string;
    id: string;
}

function riskRatingToProductRating(risk: any) {
    if (risk > 90) {
        return ProductRating.AGGRESSIVE;
    } else if (risk > 50) {
        return ProductRating.BALANCED;
    } else {
        return ProductRating.DEFENSIVE;
    }
}

function reputationRatingToStars(reputation: any): string {
    return "" + (reputation / 10);
}

export function tupleToProduct(tuple: any): Product {
    return {
        fundAddress: tuple[2],
        fundDescription: tuple[6],
        fundName: tuple[0],
        fundPastReturns: tuple[4],
        fundReputation: reputationRatingToStars(tuple[5]),
        fundRiskRating: ProductRating[riskRatingToProductRating(tuple[3])],
        id: tuple[7]
    };
}
