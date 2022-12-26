import * as React from 'react';
import { IConfigSetting } from '../../models/ConfigSettingModel';
import ReactTable from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loading } from '../Common/Loading';
import { AdminClient } from './AdminClient';
import { ConfigSettingColumns } from '../../models/EntityDefinition';
import { Action } from '../../models/Enum';

interface IState {
    editSettingResult: IConfigSetting[];
    selectedConfigSettingKey: number;
    actionType: string;
}
const adminClient = new AdminClient();

export class EditSettingContainer extends React.Component<{}, IState> {
    public state = {
        editSettingResult: [],
        selectedConfigSettingKey: 0,
        actionType: ''
    };

    public componentDidMount(): void {
        this.load();
    }

    public render(): JSX.Element {
        const { editSettingResult: settingResult } = this.state;

        // Edit & Delete buttons
        const ActionColumn = [
            {
                headerClassName: 'bold-text bg-light text-center',
                className: 'text-center small',
                width: 100,
                filterable: false,
                Cell: this.renderCell
            }
        ];

        // add Edit, Delete, Save and Cancel buttons to the first column of the datagrid
        // the buttons definition is defined inside the renderCell method
        // ConfigSettingColumns definition is in EntityDefinition.ts
        const _columns = [...ActionColumn, ...ConfigSettingColumns];

        // Sequence of actions:
        //
        // 1.   When the users click on the Edit / Delete buttons on the datagrid,
        //      The button onclick action will trigger the handleOnClick method first.
        // 2.   The handleOnClick will determine which button is clicked & set the action type
        // 3.   Then callback getTdProps = {this.selectRow} is invoked immediately after that.
        //      This is where we set the state for the selected configSettingKey and clear the actionType
        // 4.   Then callback getTrProps={this.highlightSelectedRow} is invoked next
        //      This is where we find the selected row index and highlight the row
        // 5.   Lastly, the columns={_columns} is rendered
        //      This is where the renderCell method is invoked
        //      We compare the row configSettingKey to the selectedServerKey and display the correct icons
        return (
            <>
                <div className="row">
                    <div className="col-2">
                        <button type="button" className="btn btn-outline-primary my-2">
                            <FontAwesomeIcon icon="plus" className="mr-2" style={{ color: '#007bf' }} /> Add New Config Setting
                        </button>
                    </div>
                    <div className="col text-center">{this.renderLoading()}</div>
                    <div className="col-2 text-right">
                        <h4 className="mt-2">Edit Setting</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ReactTable
                            className="-striped -highlight "
                            defaultPageSize={-1}
                            showPagination={false}
                            showPageJump={true}
                            filterable={true}
                            style={{ height: '700px' }}
                            data={settingResult}
                            noDataText="No Record Found"
                            columns={_columns}
                            getTrProps={this.highlightSelectedRow}
                            getTdProps={this.selectRow}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="">
                            {settingResult && <label className="text-left small bold-text">Record count: {settingResult.length}</label>}
                        </div>
                    </div>
                </div>
                <div>
                    <h6 className="text-danger">
                        Debug Action: {this.state.actionType} - You selected configKey: {this.state.selectedConfigSettingKey}
                    </h6>
                </div>
            </>
        );
    } // render

    private async load() {
        const allSettings = await adminClient.getSettings();
        this.setState({ editSettingResult: allSettings });
    }

    private renderLoading = () => {
        let isLoading: boolean = false;

        isLoading = this.state.editSettingResult && this.state.editSettingResult.length === 0;
        return isLoading && <Loading />;
    };

    private handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // this method is triggered by the Edit/Delete/Save/Cancel buttons
        e.preventDefault();
        const action = e.currentTarget.id;
        this.setState({ actionType: action });
    };

    // These callbacks are executed with each render of the element with four parameters:
    // 1. Table State
    // 2. RowInfo (undefined if not applicable)
    // 3. Column (undefined if not applicable)
    // 4. React Table Instance
    // getTrProps={(state, rowInfo, column, instance)
    // must have rowInfo in other to access the values of the column
    private selectRow = (rowInfo: any, column: any) => {
        // must have rowInfo in order for getTdProps to work
        return {
            style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            },
            onClick: () => {
                // the Edit/Delete/Save/Cancle onclick action will trigger the handleOnClick method first
                if (column && column.row.configSettingKey) {
                    this.setState({ selectedConfigSettingKey: column.row.configSettingKey });
                }
                // --- DO NOT DELETE ---
                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                // onClick: (e, handleOriginal) => {
                // console.log("A Td Element was clicked!");
                // console.log("it produced this event:", e);
                // console.log("It was in this column:", column);
                // console.log("It was in this row:", rowInfo);
                // console.log("It was in this table instance:", instance);
                // if (handleOriginal) {
                //     handleOriginal();
                // }
                //}
            }
        };
    };

    // These callbacks are executed with each render of the element with four parameters:
    // 1. Table State
    // 2. RowInfo (undefined if not applicable)
    // 3. Column (undefined if not applicable)
    // 4. React Table Instance
    // getTdProps={(state, rowInfo, column, instance)
    // must have rowInfo in other to access the values of the column
    private highlightSelectedRow = (rowInfo: any, column: any) => {
        const modifiedKey = this.state.selectedConfigSettingKey;
        const toolTip = `Config Setting Key: ${column.original.configSettingKey}`;

        // Look up the index for the modified rows.  If found, highlight the row
        if (modifiedKey === column.original.configSettingKey) {
            return {
                style: {
                    background: '#E6E6FA',
                    color: '#f62e18'
                },
                title: `${toolTip}`
            };
        }

        return {
            style: {
                background: '',
                color: ''
            },
            title: `${toolTip}`
        };
    };

    private renderCell = (rowInfo: any) => {
        // When the users click on the Edit / Delete buttons on the datagrid,
        // the button onclick action will trigger the handleOnClick method first.
        // The handleOnClick will determine which button is clicked & set the action type
        // Then getTdProps (selectRow) is invoked immediately after that.  This is where
        // we set the state for the selected configSettingKey and clear the actionType
        // Then getTrProps (highlightRow) follows and set the color of the selected row
        // Lastly, the renderCell method will determine which icons to display based on the action type

        // buttons: Save & Edit
        const btnSaveEditId =
            this.state.actionType === Action.Edit && this.state.selectedConfigSettingKey === rowInfo.row.configSettingKey ? 'Save' : 'Edit';
        const btnSaveEditName =
            this.state.actionType === Action.Edit && this.state.selectedConfigSettingKey === rowInfo.row.configSettingKey ? 'btnSave' : 'btnEdit';
        const btnSaveEditIcon =
            this.state.actionType === Action.Edit && this.state.selectedConfigSettingKey === rowInfo.row.configSettingKey ? 'save' : 'pen';
        const btnSaveEditColor =
            this.state.actionType === Action.Edit && this.state.selectedConfigSettingKey === rowInfo.row.configSettingKey ? '#000099' : '#DAA520';

        // buttons: Cancel & Delete
        const btnCancelDeleteId =
            this.state.actionType === Action.Edit && this.state.selectedConfigSettingKey === rowInfo.row.configSettingKey ? 'Cancel' : 'Delete';
        const btnCancelDeleteName =
            this.state.actionType === Action.Edit && this.state.selectedConfigSettingKey === rowInfo.row.configSettingKey ? 'btnCancel' : 'btnDelete';
        const btnCancelDeleteIcon =
            this.state.actionType === Action.Edit && this.state.selectedConfigSettingKey === rowInfo.row.configSettingKey ? 'times-circle' : 'trash';

        const btnCancelDeleteColor =
            this.state.actionType === Action.Edit && this.state.selectedConfigSettingKey === rowInfo.row.configSettingKey ? '#FF0000' : '#696969';

        return (
            <div>
                <button id={btnSaveEditId} name={btnSaveEditName} className="btn btn-link btn-sm" title={btnSaveEditId} onClick={this.handleOnClick}>
                    <FontAwesomeIcon icon={btnSaveEditIcon} className="small" style={{ color: btnSaveEditColor }} />
                </button>
                <button
                    id={btnCancelDeleteId}
                    name={btnCancelDeleteName}
                    className="btn btn-link btn-sm"
                    title={btnCancelDeleteId}
                    onClick={this.handleOnClick}
                >
                    <FontAwesomeIcon icon={btnCancelDeleteIcon} className="small" style={{ color: btnCancelDeleteColor}} />
                </button>
            </div>
        );
    };
} // class
