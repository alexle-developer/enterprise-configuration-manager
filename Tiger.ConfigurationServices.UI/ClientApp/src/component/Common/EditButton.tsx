import * as React from 'react';

interface IProps {
    checked?: boolean;
    editMode: () => void;
}
export class EditButton extends React.Component<IProps, {}> {
    static defaultProps = {
        checked: false
    };

    public render(): JSX.Element {
        return (
            <div className="form-inline">
                <span className="mt-1">
                    <h6 className="bold-text">Edit Mode:</h6>
                </span>
                <label className="switch ml-2">
                    <input type="checkbox" id="toggleEditBtn" defaultChecked={this.props.checked} onChange={this.handleCheck} />
                    <div className="slider round">
                        <span className="on small">ON</span>
                        <span className="off small">OFF</span>
                    </div>
                </label>
            </div>
        );
    }

    private handleCheck = () => {
        this.props.editMode();
    };
}
