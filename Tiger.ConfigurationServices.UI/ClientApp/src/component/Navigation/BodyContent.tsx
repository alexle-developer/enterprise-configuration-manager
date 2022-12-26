import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home } from '../../Home';
import { HistoryContainer } from '../History/HistoryContainer';
import { ManageServerContainer } from '../ManageServer/ManageServerContainer';
import { ManageConfigSection } from '../ManageConfig/ManageConfigSection';
import { Sidebar } from './Sidebar';
import { EditConfigContainer } from '../Admin/EditConfigContainer';
import { EditSettingContainer } from '../Admin/EditSettingContainer';
import { EditServersContainer } from '../Admin/EditServersContainer';

export class BodyContent extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <div className="container-fluid d-flex flex-fill" style={{ height: '100%' }}>
                <div className="row flex-fill">
                    <div className="col-2 col-xl-2 bg-light sidebar">
                        <Sidebar />
                    </div>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/ManageServer" component={ManageServerContainer} />
                        <Route exact path="/ManageConfig" component={ManageConfigSection} />
                        <Route exact path="/History" component={HistoryContainer} />
                        <Route path="/AdminServer" component={EditServersContainer} />
                        <Route path="/AdminConfig" component={EditConfigContainer} />
                        <Route path="/AdminSetting" component={EditSettingContainer} />
                    </main>
                </div>
            </div>
        );
    }
}

// Route does NOT follow the physical path of project structure.  Path name is arbitrarily set, but it is the component
// that picks up the correct content.

// Note: The distance from the header to the top of the body content is set
// in the style.css using padding - top: 90px (see below)
//
// [role='main'] {
//     padding-top: 133px; /* Space for fixed navbar */
// }

// @media (min-width: 768px) {
//     [role='main'] {
//         padding-top: 90px; /* 90px is the vertical distance from the header | Space for fixed navbar */
//     }
// }
