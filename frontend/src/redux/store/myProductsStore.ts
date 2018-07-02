
import { Product } from "../../models/Products";

export interface MyProductsStore {
    sampleData: Product[];
    fetching: boolean;
    fetched: boolean;
}
