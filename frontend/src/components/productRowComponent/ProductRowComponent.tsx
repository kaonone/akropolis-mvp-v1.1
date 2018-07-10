/* tslint:disable:no-implicit-dependencies */
import PiktoBg from "-!svg-react-loader?name=Icon!../../assets/images/pikto-bg.svg";
import IconStar from "-!svg-react-loader?name=Icon!../../assets/images/star-icon.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { Product } from "../../models/Products";
import "./c-product-row.css";

interface Props {
    productData: Product;
    onClickProduct: (id: string) => void;
    idOfcheckedProduct: string;
}

export default class ProductRowComponent extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const { fundDescription, fundName, fundReputation, fundRiskRating, id } = this.props.productData;
        const isChecked = this.props.idOfcheckedProduct === id ? true : false;

        return (
            <div onClick={() => {
                this.props.onClickProduct(id);
            }
            } className={`c-product-row ${isChecked ? "c-product-row--checked" : ""}`}>
                <h4 className="c-product-row__fund-value">{fundReputation}<IconStar className="c-product-row__icon" /></h4>
                <PiktoBg className="c-product-row__pikto-bg" />
                <div className="c-product-row__wrapper-headline">
                    <h4 className="c-product-row__headline">{fundName}</h4>
                </div>
                <p className={`c-product-row__describe ${isChecked ? "c-product-row__describe--all-decribe" : ""}`}>{fundDescription}</p>
                
                    <h4 className="o-labels c-product-row__labels">{fundRiskRating}</h4>
                
            </div>
        );
    }
}
