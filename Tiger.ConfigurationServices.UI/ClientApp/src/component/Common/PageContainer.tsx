import * as React from 'react';

export interface IProps {
    headerContent?: React.ReactNode;
    leftContent?: React.ReactNode;
    centerContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    footerContent?: React.ReactNode;
    border?: string;
}

export interface IState {}

class PageContainer extends React.Component<IProps, IState> {
    static defaultProps = {
        topContent: undefined,
        leftcontent: undefined,
        centerContent: undefined,
        rightContent: undefined,
        bottomContent: undefined,
        border: 'off'
    };

    public render(): JSX.Element {
        console.log('border: ', this.props.border);
        return (
            <div className="container-fluid">
                {this.props.headerContent && (
                    <div className={`row ${this.props.border === 'on' ? 'border-black' : ''}`}>
                        <div className="col">{this.props.headerContent}</div>
                    </div>
                )}
                <div className={`row ${this.props.border === 'on' ? 'border-red' : ''}`} style={{ minHeight: 700 }}>
                    {this.props.leftContent && (
                        <div className={`col-2 ${this.props.border === 'on' ? 'border-red' : ''}`}>{this.props.leftContent}</div>
                    )}
                    {this.props.centerContent && (
                        <div className={`col ${this.props.border === 'on' ? 'border-red' : ''}`}>
                            <div className="text-center">{this.props.centerContent}</div>
                        </div>
                    )}
                    {this.props.rightContent && (
                        <div className={`col-2 ${this.props.border === 'on' ? 'border-red' : ''}`}>{this.props.rightContent}</div>
                    )}
                </div>
                {this.props.footerContent && (
                    <div className={`row ${this.props.border === 'on' ? 'border-black' : ''}`}>
                        <div className="col">{this.props.footerContent}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default PageContainer;
