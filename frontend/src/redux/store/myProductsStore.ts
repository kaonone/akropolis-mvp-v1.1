
import { Product } from "../../models/Products";

export interface MyProductsStore {
    products: Product[];
    productSelected: Product | null;
    fetching: boolean;
    fetched: boolean;
}
