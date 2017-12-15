import React from 'react';
import ReactDOM from 'react-dom';
 
var HelloBox = () => {
    return (
       <div className="helloTag">
      Hello world from ReactJS
      </div>
    );
};
 
ReactDOM.render(<HelloBox/>, document.getElementById('helloTag'));
