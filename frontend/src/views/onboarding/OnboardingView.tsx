import * as React from "react";
import logoAkropolis from "../../assets/images/logo-akropolis.svg";
import BenefitsComponent from "../../components/benefits/BenefitsComponent";
import CreatingPortfolioPartOneComponent from "../../components/creatingPortfolioPartOne/CreatingPortfolioPartOneComponent";
import CreatingPortfolioPartTwo from "../../components/creatingPortfolioPartTwo/CreatingPortfolioPartTwo"; 
import "./v-onboarding.css";

interface State {
    desiredAnualIncome: string;
    numberOfSlide: number;
}

export interface Props {
    changeSlide: (value: number) => void;
}

export default class OnboardingView extends React.Component<any, State> {

    public readonly state: State = {
        desiredAnualIncome: "",
        numberOfSlide: 1
    };

    public render() {

        return (
            <div className="v-onboarding">
                <img className="v-onboarding__logo" src={logoAkropolis} />

                {this.state.numberOfSlide === 1 &&
                    <BenefitsComponent changeSlide={this.changeSlide} />
                }

                {this.state.numberOfSlide === 2 &&
                    <CreatingPortfolioPartOneComponent changeSlide={this.changeSlide} />
                }

                {this.state.numberOfSlide === 3 &&
                    <CreatingPortfolioPartTwo changeSlide={this.changeSlide} />
                }
            </div>
        );
    }

    private changeSlide = (value: number) => {
        this.setState({ numberOfSlide: value });
    }
}
