import * as React from 'react';
import { SelectDropdown } from './SelectDropdown';
import { ViewBy } from '../../models/Enum';
import { KeyValuePair } from './KeyValuePair';

interface IProps {
    selectFor?: string;
    selectedValue: string;
    options: KeyValuePair<any, string>[];
    onConfigSelect: (selectedValue: string) => void;
}

interface IState { }

export class ConfigSelections extends React.Component<IProps, IState> {
    static defaultProps = {
        selectFor: ViewBy.Config
    };

    public render(): JSX.Element {
        const isConfig = this.props.selectFor && this.props.selectFor === ViewBy.Config;
        const selectLabel = isConfig ? 'Configuration' : 'Configuration Setting';

        return (
            // style size the width of the dropdown
            <div className="form-check-inline" style={{ width: '100%' }}>
                <label className="bold-text  m-2" htmlFor="configSelections">
                    {selectLabel}
                </label>
                <div style={{ width: '40%' }}>
                    <SelectDropdown  optionList={this.props.options} selectedValue={this.props.selectedValue} onSelect={this.handleOnSelect} />
                </div>
            </div>
        );
    }
    private handleOnSelect = (selectedValue: string) => {
        // return the value to the parent (calling) component
        this.props.onConfigSelect(selectedValue);
    };
}