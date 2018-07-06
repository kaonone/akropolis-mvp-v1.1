
import { Product } from "../../models/Products";

export interface SelectAFundStore {
    products: Product[];
    productSelected: Product | null;
    fetching: boolean;
    fetched: boolean;
}
