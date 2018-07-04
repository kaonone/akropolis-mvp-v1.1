/* tslint:disable:no-implicit-dependencies */
import IconStar from "-!svg-react-loader?name=Icon!../../assets/images/star-icon.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { Product } from "../../models/Products";
import "./c-product-row.css";

interface Props {
    productData: Product;
    onClickProduct: (id: number) => void;
    idOfcheckedProduct: number | undefined;
}

export default class ProductRowComponent extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const { fundDescription, fundName, fundPastReturns, fundReputation, fundRiskRating, id } = this.props.productData;
        const isChecked = this.props.idOfcheckedProduct === id ? true : false;
        
        return (
            <div onClick={() => {
                this.props.onClickProduct(id);
            }
            } className={`c-product-row ${isChecked ? "c-product-row--checked" : ""}`}>
                <div className="c-product-row__wrapper-headline">
                    <h4 className="c-product-row__headline">{fundName}</h4>
                </div>
                <p className={`c-product-row__describe ${isChecked ? "c-product-row__describe--all-decribe" : ""}`}>{fundDescription}</p>
                <div className="c-product-row__wrapper-fund-value">
                    <h4 className="c-product-row__describe-fund-value">{fundRiskRating}</h4>
                    <h4 className="c-product-row__fund-value">{fundPastReturns}%</h4>
                    <h4 className="c-product-row__fund-value"><IconStar className="c-product-row__icon" />{fundReputation}</h4>
                </div>
            </div>
        );
    }
}
