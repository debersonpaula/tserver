import * as React from 'react';

export default class ServerApp extends React.Component<any, any>{
    render(){
        return (
            <div>
                <button onClick={function(){
                    alert('from appserver');
                }}></button>
            </div>
        );
    }
}