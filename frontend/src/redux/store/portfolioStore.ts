import { Commitment } from "../../models/Commitment";

export interface PortfolioStore {
    commitment: Commitment;
    commitmentFetched: boolean;
    commitmentFetching: boolean;

    portfolioExist: boolean;
    portfolioFetched: boolean;
}
