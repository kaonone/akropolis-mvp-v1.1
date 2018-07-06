import * as React from "react";

import "./c-sub-navigation.css";

interface Props {
    title: string;
    spaceForArrow?: boolean;
}

export default class SubNavigationComponent extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const { title, spaceForArrow } = this.props;

        return (
            <div className="c-sub-navigation">
                <h2 className={`c-sub-navigation__headline ${spaceForArrow ? "c-sub-navigation__headline--margin-extra" : ""}`}>{title}</h2>
            </div>
        );
    }
}