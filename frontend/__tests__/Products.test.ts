import {Product, ProductRating, tupleToProduct} from "../src/models/Products";

test("Tuple to Product should parse the \"Solidity-generated\" tuple to a Product instance", () => {
    const tuple: any = [
        "Gold Investment",
        "0x6ffb9eff3241df47156e7c26eed8f5b952aadf84",
        "0x5dfc687af541c9a7180fc3dca46d307bf79a6726",
        "20",
        "7",
        "80",
        "London gold fix in USD",
        "1"
    ];
    const result: Product = tupleToProduct(tuple);
    expect(result.fundName).toBe(tuple[0]);
    expect(result.fundRiskRating).toBe(ProductRating[ProductRating.CONSERVATIVE]);
    expect(result.fundPastReturns).toBe(tuple[4]);
    expect(result.fundReputation).toBe("4");
    expect(result.fundDescription).toBe(tuple[6]);
});