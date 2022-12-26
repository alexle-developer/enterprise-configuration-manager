import * as React from 'react';
import { IConfig } from '../../models/ConfigModel';
import { AdminClient } from './AdminClient';
import { Loading } from '../Common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTable from 'react-table';
import { ConfigColumns } from '../../models/EntityDefinition';
import { Action } from '../../models/Enum';

interface IState {
    editConfigResult: IConfig[];
    selectedConfigKey: number;
    actionType: string;
}
const adminClient = new AdminClient();

export class EditConfigContainer extends React.Component<{}, IState> {
    public state = {
        editConfigResult: [],
        selectedConfigKey: 0,
        actionType: ''
    };

    public componentDidMount(): void {
        this.load();
    }

    public render(): JSX.Element {
        const ActionColumn = [
            {
                headerClassName: 'bold-text bg-light text-center',
                className: 'text-center small',
                filterable: false,
                width: 100,
                Cell: this.renderCell
            }
        ];

        // add Edit, Delete, Save and Cancel buttons to the first column of the datagrid
        // the buttons definition is defined inside the renderCell method
        // ConfigColumns definition is in EntityDefinition.ts
        const _columns = [...ActionColumn, ...ConfigColumns];

        // Sequence of actions:
        //
        // 1.   When the users click on the Edit / Delete buttons on the datagrid,
        //      The button onclick action will trigger the handleOnClick method first.
        // 2.   The handleOnClick will determine which button is clicked & set the action type
        // 3.   Then callback getTdProps = {this.selectRow} is invoked immediately after that.
        //      This is where we set the state for the selected serversKey and clear the actionType
        // 4.   Then callback getTrProps={this.highlightSelectedRow} is invoked next
        //      This is where we find the selected row index and highlight the row
        // 5.   Lastly, the columns={_columns} is rendered
        //      This is where the renderCell method is invoked
        //      We compare the row serversKey to the selectedServerKey and display the correct icons

        return (
            <>
                <div className="row">
                    <div className="col-2">
                        <button id="Add" name="btnAdd" type="button" className="btn btn-outline-primary my-2">
                            <FontAwesomeIcon icon="plus" className="mr-2" style={{ color: '#007bf' }} /> Add New Config
                        </button>
                    </div>
                    <div className="col text-center">{this.renderLoading()}</div>
                    <div className="col-2 text-right">
                        <h4 className="mt-2">Edit Config</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ReactTable
                            className="-striped -highlight "
                            defaultPageSize={-1}
                            showPagination={false}
                            showPageJump={true}
                            filterable
                            style={{ height: '700px' }}
                            data={this.state.editConfigResult}
                            noDataText="No Record Found"
                            getTdProps={this.selectRow}
                            getTrProps={this.highlightSelectedRow}
                            columns={_columns}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="">
                            {this.state.editConfigResult && (
                                <label className="text-left small bold-text">Record count: {this.state.editConfigResult.length}</label>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <h6 className="text-danger">
                        Debug Action: {this.state.actionType} - You selected configKey: {this.state.selectedConfigKey}
                    </h6>
                </div>
            </>
        );
    } // render

    private async load() {
        const allConfigs = await adminClient.getConfigs();
        this.setState({ editConfigResult: allConfigs });
    }

    private renderLoading = () => {
        let isLoading: boolean = false;

        isLoading = this.state.editConfigResult && this.state.editConfigResult.length === 0;
        return isLoading && <Loading />;
    };

    private handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // this method is triggered by the Edit/Delete/Save/Cancel buttons
        e.preventDefault();
        const action = e.currentTarget.id;
        console.log('1. You clicked this button: ', e.currentTarget.name);
        console.log('2. The action type is: ', action);
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
        // capture the config setting key for the selected row
        return {
            style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            },
            onClick: () => {
                // the Edit/Delete/Save/Cancle onclick action will trigger the handleOnClick method first
                if (column && column.row.configKey) {
                    this.setState({ selectedConfigKey: column.row.configKey });
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
        const modifiedKey = this.state.selectedConfigKey;
        const toolTip = `Config Key: ${column.original.configKey}`;

        // Look up the index for the modified rows.  If found, highlight the row
        if (modifiedKey === column.original.configKey) {
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
        // we set the state for the selected configKey and clear the actionType
        // Then getTrProps (highlightRow) follows and set the color of the selected row
        // Lastly, the renderCell method will determine which icons to display based on the action type

        // buttons: Save & Edit
        const btnSaveEditId = this.state.actionType === Action.Edit && this.state.selectedConfigKey === rowInfo.row.configKey ? 'Save' : 'Edit';
        const btnSaveEditName =
            this.state.actionType === Action.Edit && this.state.selectedConfigKey === rowInfo.row.configKey ? 'btnSave' : 'btnEdit';
        const btnSaveEditIcon = this.state.actionType === Action.Edit && this.state.selectedConfigKey === rowInfo.row.configKey ? 'save' : 'pen';
        const btnSaveEditColor =
            this.state.actionType === Action.Edit && this.state.selectedConfigKey === rowInfo.row.configKey ? '#000099' : '#DAA520';
       

        // buttons: Cancel & Delete
        const btnCancelDeleteId =
            this.state.actionType === Action.Edit && this.state.selectedConfigKey === rowInfo.row.configKey ? 'Cancel' : 'Delete';
        const btnCancelDeleteName =
            this.state.actionType === Action.Edit && this.state.selectedConfigKey === rowInfo.row.configKey ? 'btnCancel' : 'btnDelete';
        const btnCancelDeleteIcon =
            this.state.actionType === Action.Edit && this.state.selectedConfigKey === rowInfo.row.configKey ? 'times-circle' : 'trash';
        const btnCancelDeleteColor =
            this.state.actionType === Action.Edit && this.state.selectedConfigKey === rowInfo.row.configKey ? '#FF0000' : '#696969';

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
                    <FontAwesomeIcon icon={btnCancelDeleteIcon} className="small" style={{ color: btnCancelDeleteColor }} />
                </button>
            </div>
        );
    };
} //class
