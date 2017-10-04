import * as React from 'react';
import * as FrontUtils from '../lib/frontutils';

//put <any, any> to get this.state.content
class ReactApp extends React.Component<any, any>{
    constructor(){
        super();
        this.state = {
            content: "Loading...",
            menuleft: ""
        };
        this.ChangeContent = this.ChangeContent.bind(this);
        this.OnLinkClick = this.OnLinkClick.bind(this);
    }
    render(){
        return (
            <div className="dpage">
                <DHeader />
                <DBody data = {this.state} funcLinkClick = {this.OnLinkClick}/>
                <DFooter />
            </div>
        );
    }
    ChangeContent(str:string){
        this.setState({content: str});
    }
    OnLinkClick(e:any){
        //console.log(e);
        e.preventDefault();
        this.ChangeContent(e.target.getAttribute('data-link'));
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
class DBody extends React.Component<any, any>{
    render() {
        var content = this.props.data.content,
            menuleft = this.props.data.menuleft,
            OnLinkClick = this.props.funcLinkClick;
        return (
            <div className="dbody">
                <div className="dmenuleft">
                    <header>Menu Sample</header>
                    <ul>
                        <li><a onClick={OnLinkClick} data-link="Menu Item 1">Menu Item 1</a></li>
                        <li><a onClick={OnLinkClick} data-link="Menu Item 2">Menu Item 2</a></li>
                        <li><a onClick={OnLinkClick} data-link="Menu Item 3">Menu Item 3</a></li>
                    </ul>
                    {menuleft}
                </div>
                <div className="dcontent">
                    {content}
                </div>
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