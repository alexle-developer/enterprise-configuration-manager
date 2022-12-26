import * as React from 'react';
import { IConfigEdit } from '../../models/ConfigEditModel';
import { IConfigSettingEdit } from '../../models/ConfigSettingEditModel';
import { IConfigValueEdit } from '../../models/ConfigValueEditModel';
import { HistoryClient } from './HistoryClient';
import { HistoryResult } from './HistoryResult';
import { ViewBy } from '../../models/Enum';

interface IState {
    uniqueId: number;
    browseHistory: string;
    configEditResult: IConfigEdit[];
    configSettingEditResult: IConfigSettingEdit[];
    configValueEditResult: IConfigValueEdit[];
    historyResult: any[];
}

const historyClient = new HistoryClient();

export class HistoryContainer extends React.Component<{}, IState> {
    public state: IState = {
        uniqueId: 0,
        browseHistory: '',
        configEditResult: [],
        configSettingEditResult: [],
        configValueEditResult: [],
        historyResult: []
    };

    private isComponentMounted: boolean = false;

    public componentDidMount(): void {
        this.load();
        this.isComponentMounted = true;
    }

    public componentWillUnmount(): void {
        this.isComponentMounted = false;
    }
    public render(): JSX.Element {
        return (
            <>
                <div className="container-fluid">
                    <div className="row my-2">
                        <div className="col align-left">{this.toggleHistoryButtons()}</div>
                    </div>
                    <div className="row my-2">
                        <div className="col" style={{ width: '700px' }}>
                            {this.state.browseHistory && (
                                <HistoryResult key={this.state.uniqueId} detailId={this.state.browseHistory} data={this.state.historyResult} />
                            )}
                        </div>
                    </div>
                    <div className="mx-3">
                        {this.state.browseHistory && (
                            <label className="text-left small bold-text">Record count: {this.state.historyResult.length}</label>
                        )}
                    </div>
                </div>
            </>
        );
    }

    private async load() {
        const editConfigHistory = await historyClient.getConfigEditHistory();
        const editSettingHistory = await historyClient.getConfigSettingEditHistory();

        this.setState({ configEditResult: editConfigHistory, configSettingEditResult: editSettingHistory });
    }

    private toggleHistoryButtons = () => {
        return (
            <>
                <div className="align-left mt-1">
                    <label className="bold-text-16 mx-4">Browsing History </label>
                    <button type="button" className="btn btn-outline-primary btn-sm  mr-2" value={ViewBy.Config} onClick={this.handleOnClick}>
                        Config Edit History
                    </button>
                    <button type="button" className="btn btn-outline-primary btn-sm mx-2" value={ViewBy.Setting} onClick={this.handleOnClick}>
                        Config Setting Edit
                    </button>
                    <button type="button" className="btn btn-outline-primary btn-sm  disabled" value={ViewBy.Value} onClick={this.handleOnClick}>
                        Config Value Edit
                    </button>
                </div>
            </>
        );
    };

    private handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { configEditResult, configSettingEditResult, configValueEditResult } = this.state;
        const selected = event.currentTarget.value;

        switch (selected) {
            case ViewBy.Config:
                this.setResult(selected, configEditResult);
                break;
            case ViewBy.Setting:
                this.setResult(selected, configSettingEditResult);
                break;
            case ViewBy.Value:
                this.setResult(selected, configValueEditResult);
                break;
            default:
                this.setResult(selected, []);
                break;
        }
    };
    private setResult = (selected: string, historyResult: any[]) => {
        const id = this.state.uniqueId + 1;
        if (this.isComponentMounted) {
            this.setState({ uniqueId: id, browseHistory: selected, historyResult: historyResult });
        }
    };
} // export
