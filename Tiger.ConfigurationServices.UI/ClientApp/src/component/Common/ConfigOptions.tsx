import * as React from 'react';
import { ViewBy } from '../../models/Enum';

interface IProps {
    option?: string;
    selectedView: (selectedOption: string) => void;
}

interface IState {
    currentOption: string;
}

export class ConfigOptions extends React.Component<IProps, IState> {
    static defaultProps = {
        option: ViewBy.Config
    };

    public render(): JSX.Element {
        const pageTitle = 'View By';

        return (
            <div>
                <div className="form-check form-check-inline mt-1">
                    <label className="mt-1 mr-2 bold-text">{pageTitle}</label>
                    <input
                        id="viewByConfigNameId"
                        className="form-check-input"
                        type="radio"
                        name="viewByRadioOptions"
                        value={ViewBy.Config}
                        checked={this.props.option === ViewBy.Config}
                        onChange={this.handleViewByOptionChange}
                    />
                    <label className="mr-3 form-check-label bold-text">Config</label>
                    <input
                        id="viewByConfigSettingId"
                        className="form-check-input"
                        type="radio"
                        name="viewByRadioOptions"
                        value={ViewBy.Setting}
                        checked={this.props.option === ViewBy.Setting}
                        onChange={this.handleViewByOptionChange}
                    />
                    <label className="mr-3 form-check-label bold-text">Setting</label>
                </div>
            </div>
        );
    }
    private handleViewByOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.selectedView(e.currentTarget.value);
    };
}
