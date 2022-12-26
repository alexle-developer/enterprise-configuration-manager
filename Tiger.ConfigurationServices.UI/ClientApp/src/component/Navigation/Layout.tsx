import * as React from 'react';
import curo_logo from '../Navigation/curo_logo.png';
import { BodyContent } from './BodyContent';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return (
            <>
                <div>
                    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                        <a className="navbar-brand" href="http://www.curo.com">
                            <img src={curo_logo} />
                        </a>
                    </nav>
                </div>
                <BodyContent />
            </>
        );
    }
}
