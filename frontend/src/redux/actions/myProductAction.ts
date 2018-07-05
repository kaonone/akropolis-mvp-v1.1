// import axios from "axios";
import {config} from "../../config/config";
import * as constants from "../../constants/actions";
import {Product, tupleToProduct} from "./../../models/Products";
import {Action} from "./action";

const listOfProductsMockData = (config.deployment.deployedFunds).map(tupleToProduct);
// const listOfProductsMockData =
//     [
//         {
//             fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//             fundName: "Fund name",
//             fundPastReturns: "12",
//             fundReputation: "4.9",
//             fundRiskRating: "Conservative",
//             id: 0,
//         },
//         {
//             fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//             fundName: "Fund name",
//             fundPastReturns: "2",
//             fundReputation: "4.9",
//             fundRiskRating: "Conservative",
//             id: 1,
//         },
//         {
//             fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//             fundName: "Fund name",
//             fundPastReturns: "9",
//             fundReputation: "4.9",
//             fundRiskRating: "Conservative",
//             id: 2,
//         },
//         {
//             fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//             fundName: "Fund name",
//             fundPastReturns: "6",
//             fundReputation: "4.9",
//             fundRiskRating: "Conservative",
//             id: 3,
//         },
//         {
//             fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//             fundName: "Fund name",
//             fundPastReturns: "9",
//             fundReputation: "4.9",
//             fundRiskRating: "Conservative",
//             id: 4,
//         },
//         {
//             fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//             fundName: "Fund name",
//             fundPastReturns: "20",
//             fundReputation: "4.9",
//             fundRiskRating: "Conservative",
//             id: 5,
//         },
//         {
//             fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//             fundName: "Fund name",
//             fundPastReturns: "23",
//             fundReputation: "4.9",
//             fundRiskRating: "Conservative",
//             id: 6,
//         },
//         {
//             fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
//             fundName: "Fund name",
//             fundPastReturns: "5",
//             fundReputation: "4.9",
//             fundRiskRating: "Conservative",
//             id: 7,
//         }
//     ];

export function fetchProductsDataAction(): Action<constants.FETCH_PRODUCTS_DATA, Product[]> {
    return {
        payload: listOfProductsMockData,
        type: constants.FETCH_PRODUCTS_DATA,
    };
}

export function selectProductAction(product: Product): Action<constants.SELECT_PRODUCT, Product> {
    return {
        payload: product,
        type: constants.SELECT_PRODUCT,
    };
}
