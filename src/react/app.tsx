import * as React from 'react';

class ReactApp extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="dpage">
                <DHeader />
                <DBody />
                <DFooter />
            </div>
        );
    }
}

class DHeader extends React.Component {
    render() {
        return (
            <div className="dheader">
                <div className="dlogo">TServer</div>
                <div className="dnav"></div>
            </div>
        );
    }
}
class DBody extends React.Component {
    render() {
        return (
            <div className="dbody">
                <div className="dmenuleft"></div>
                <div className="dcontent"></div>
            </div>
        );
    }
}
class DFooter extends React.Component {
    render() {
        return (
            <div className="dfooter"><footer>Copyright © 2016-2017 TServer. All rights reserved.</footer></div>
        );
    }
}

export default ReactApp;