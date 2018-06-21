import * as React from "react";

interface Props {
    message: string;
}

export class SampleComponent extends React.Component<Props, {}> {
    public render() {
        const msg = this.props.message;
        return <div>{msg}</div>;
    }
}
