import * as React from 'react';
import { EditButton } from '../Common/EditButton';
import { ConfigOptions } from '../Common/ConfigOptions';
import { ViewBy } from '../../models/Enum';
import { KeyValuePair } from '../Common/KeyValuePair';
import { ManageConfigClient } from './ManageConfigClient';
import { ConfigSelections } from '../Common/ConfigSelections';
import { IConfigValueResult } from '../../models/ConfigValueResultModel';
import { ManageConfigResult } from './ManageConfigResult';

interface IProps {}

interface IState {
    uniqueId: number;
    checked: boolean;
    viewBy: string;
    selectedValue: string;
    configList: KeyValuePair<any, string>[];
    settingList: KeyValuePair<any, string>[];
    options: KeyValuePair<any, string>[];
    configValueResult: IConfigValueResult[];
}

const manageConfigClient = new ManageConfigClient();

export class ManageConfigSection extends React.Component<IProps, IState> {
    private isComponentMounted: boolean = false;

    public state: IState = {
        uniqueId: 0,
        checked: false,
        viewBy: ViewBy.Config,
        selectedValue: '',
        configList: [],
        settingList: [],
        options: [],
        configValueResult: []
    };

    public render(): JSX.Element {
        let isDebug: boolean = false;

        return (
            <>
                <div className="container-fluid">
                    <div className="row my-2">
                        <div className="col-3 text-left">
                            <ConfigOptions option={this.state.viewBy} selectedView={this.toggleView} />
                        </div>
                        <div className="col text-left">
                            <ConfigSelections
                                selectFor={this.state.viewBy}
                                selectedValue={this.state.selectedValue}
                                options={this.state.options}
                                onConfigSelect={this.handleConfigSelectChange}
                            />
                        </div>
                        <div className="col-3 text-center">
                            <EditButton editMode={this.toggleEdit} />
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 mr-2" style={{ maxHeight: 720 }}>
                        <div className="mr-2 my-2">
                            {this.state.configValueResult && (
                                <ManageConfigResult
                                    key={this.state.uniqueId}
                                    editMode={this.state.checked}
                                    data={this.state.configValueResult}
                                    onCancel={this.handleCancel}
                                    onSave={this.handleSave}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="">
                    {this.state.configValueResult && (
                        <label className="text-left small bold-text">Record count: {this.state.configValueResult.length}</label>
                    )}
                </div>
                {isDebug && (
                    <div>
                        <h2>
                            Debug: Edit Mode is: {this.state.checked ? 'on' : 'off'} | View by: {this.state.viewBy} | Selected value:{' '}
                            {this.state.selectedValue} | Config Value Results: {this.state.configValueResult.length}
                        </h2>
                    </div>
                )}
            </>
        );
    } // render

    private handleSelect = async (selectedValue: string) => {
        try {
            let cfValues: IConfigValueResult[] = [];
            const isConfig = this.state.viewBy == ViewBy.Config;
            const kvpList = isConfig ? this.state.configList : this.state.settingList;
            // find the index of the dropdown list that has a value equals to selectedValue (e.g. SRC_PRE, SRC_TRAIN, etc...)
            // using the index to obtain the key from KeyValuePair which is the config_key or config_setting_key
            // if selectedValue is defined, then find the key for the selected value in the KeyValuePair[]
            // Example: kvConfigSettings["SRC_PRE"].key returns the ConfigSettingKey
            const cfgKey: number = selectedValue ? kvpList[kvpList.findIndex(v => v.value === selectedValue)].key : 0;

            if (cfgKey > 0) {
                cfValues = isConfig
                    ? await manageConfigClient.getConfigValuesByConfigKey(cfgKey)
                    : await manageConfigClient.getConfigValuesByConfigSettingKey(cfgKey);
            }

            if (this.isComponentMounted) {
                this.setState({ uniqueId: cfgKey, selectedValue: selectedValue, configValueResult: cfValues });
            }
        } catch (asyncError) {
            console.log('ManageConfigSection handleOnSelect async error: ', asyncError);
        }
    };

    private handleCancel = () => {
        this.handleSelect(this.state.selectedValue);
    };

    private handleSave = (modifiedConfigValues: IConfigValueResult[]) => {
        // convert IConfigValueResult to IConfigValue for updating the database
        //  TODO: implement backend logic
        console.log('Save Data...');
        console.log(modifiedConfigValues);
    };

    public async componentDidMount() {
        this.fetchData();
        this.isComponentMounted = true;
    }

    public componentWillUnmount(): void {
        this.isComponentMounted = false;
    }

    // populate dropdowns
    private fetchData = async () => {
        const configNameList = await manageConfigClient.populateConfigDropdown();
        const configSettingNameList = await manageConfigClient.populateSettingDropdown();
        const optionList = this.state.viewBy === ViewBy.Config ? configNameList : configSettingNameList;
        this.setState({ configList: configNameList, settingList: configSettingNameList, options: optionList });
    };
    // Edit Mode On or Off
    private toggleEdit = () => {
        this.setState({ checked: !this.state.checked });
    };

    // View By Options Config or Setting
    private toggleView = (selectedView: string) => {
        const optionList = selectedView === ViewBy.Config ? this.state.configList : this.state.settingList;
        this.setState({ viewBy: selectedView, selectedValue: '', options: optionList, configValueResult: [] });
    };

    private handleConfigSelectChange = async (selectedValue: string) => {
        const { viewBy, configList, settingList } = this.state;

        try {
            const kvpList = viewBy === ViewBy.Config ? configList : settingList;

            // find the index of the dropdown list that has a value equals to selectedValue (e.g. SRC_PRE, SRC_TRAIN, etc...)
            // using the index to obtain the key from KeyValuePair which is the config_key or config_setting_key
            // if selectedValue is defined, then find the key for the selected value in the KeyValuePair[]
            // Example: kvConfigSettings["SRC_PRE"].key returns the ConfigSettingKey
            const cfgKey: number = selectedValue ? kvpList[kvpList.findIndex(v => v.value === selectedValue)].key : 0;
            let cfgResult: IConfigValueResult[] = await this.getResult(cfgKey);

            if (this.isComponentMounted) {
                this.setState({ uniqueId: cfgKey, selectedValue: selectedValue, configValueResult: cfgResult });
            }
        } catch (asyncError) {
            console.log('ManageConfigSection handleOnSelect async error: ', asyncError);
        }
    };

    private getResult = async (key: number) => {
        let result: IConfigValueResult[] = [];

        if (key > 0) {
            result =
                this.state.viewBy === ViewBy.Config
                    ? await manageConfigClient.getConfigValuesByConfigKey(key)
                    : await manageConfigClient.getConfigValuesByConfigSettingKey(key);
        }
        return result;
    };
}
