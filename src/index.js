import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
//import 'bootstrap/dist/css/bootstrap.min.css';

/*var element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
console.log("debugging-breakpoint 1");

ReactDOM.render(element, document.getElementById('root'));*/
ReactDOM.render( < App /> , document.getElementById('root'));
registerServiceWorker();