import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Sidebar extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <>
                <ul className="nav flex-column" style={{ color: '#FFFFFF' }}>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/'}>
                            <FontAwesomeIcon icon="home" className="mr-2" style={{ color: '#000000' }} />
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item" title="Edit Config Value by Config or Setting">
                        <NavLink className="nav-link" to={'/ManageConfig'} activeClassName="nav-link-active">
                            <FontAwesomeIcon icon="tools" className="mr-2" style={{ color: '#0b2038' }} />
                            Manage Configuration
                        </NavLink>
                    </li>
                    <li className="nav-item" title="View Edit History">
                        <NavLink className="nav-link" to={'/History'} activeClassName="nav-link-active">
                            <FontAwesomeIcon icon="history" className="mr-2" style={{ color: '#800000' }} />
                            View History
                        </NavLink>
                    </li>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Administration</span>
                    </h6>
                    <li className="nav-item" title="Edit Server">
                        <NavLink className="nav-link" to={'/AdminServer'} activeClassName="nav-link-active">
                            <FontAwesomeIcon icon="tasks" className="mr-2" style={{ color: '#0000FF' }} />
                            Ad/Edit Servers
                        </NavLink>
                    </li>

                    <li className="nav-item" title="Add/Edit Config">
                        <NavLink className="nav-link" to={'/AdminConfig'} activeClassName="nav-link-active">
                            <FontAwesomeIcon icon="tasks" className="mr-2" style={{ color: '#0000FF' }} />
                            Add/Edit Config
                        </NavLink>
                    </li>
                    <li className="nav-item" title="Add/Edit Setting">
                        <NavLink className="nav-link" to={'/AdminSetting'} activeClassName="nav-link-active">
                            <FontAwesomeIcon icon="tasks" className="mr-2" style={{ color: '#0000FF' }} />
                            Add/Edit Config Setting
                        </NavLink>
                    </li>
                </ul>
            </>
        );
    }
}
