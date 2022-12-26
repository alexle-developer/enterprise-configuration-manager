import * as React from 'react';

// context allows state to be shared between components
// ITabContext will contain the active tab name and the
// reference to the handleClick function
interface ITabsContext {
    activeName?: string;
    handleTabClick?: (name: string, content: React.ReactNode) => void;
}

interface ITabProps {
    name: string; // unique name for the tab
    initialActive?: boolean;
    heading: () => string | JSX.Element;
}

interface IProps {}

interface IState {
    activeName: string;
    activeContent: React.ReactNode;
}

// pass an empty object to createContext since we do not have a default context
// this is why both of the context properties are optional
const TabsContext = React.createContext<ITabsContext>({});

export class Tabs extends React.Component<IProps, IState> {
    // The Tab component is defined as a static property on the Tabs component
    // this means Tab lives on the actual Tabs class and not in its instances
    // reference Tab in JSX using Tabs.Tab
    public static Tab: React.SFC<ITabProps> = props => (
        <TabsContext.Consumer>
            {(context: ITabsContext) => {
                const tabAttributes = `#${props.name.replace(/\s/g, '').toLowerCase()}`;
                const tabId = `${tabAttributes}-tab`;

                const activeName = context.activeName ? context.activeName : props.initialActive ? props.name : '';
                const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
                    if (context.handleTabClick) {
                        context.handleTabClick(props.name, props.children);
                    }
                };
                return (
                    <li className="nav-item" onClick={handleClick}>
                        <a
                            className={props.name === activeName ? 'nav-link active' : 'nav-link'}
                            id={tabId}
                            data-toggle="tab"
                            href={`#${tabAttributes}`}
                            role="tab"
                        >
                            {props.heading()}
                            {console.log(' props name: ', props.name)}
                            {console.log('tab id : ', tabId)}
                            {console.log('#href: ', `${tabAttributes}`)}
                        </a>
                    </li>
                );
            }}
        </TabsContext.Consumer>
    );

    // The context provider fills the context with values. The provider takes in a
    // property called "value" and set this to an object containing active tab and click event
    public render(): JSX.Element {
        return (
            <TabsContext.Provider value={{ activeName: this.state ? this.state.activeName : '', handleTabClick: this.handleTabClick }}>
                <ul className="nav nav-tabs" id="contextTab" role="tablist">
                    {this.props.children}
                </ul>
                <div className="tab-content"> {this.state && this.state.activeContent}</div>
            </TabsContext.Provider>
        );
    } // render

    private handleTabClick = (name: string, content: React.ReactNode) => {
        this.setState({ activeName: name, activeContent: content });
    };
}
