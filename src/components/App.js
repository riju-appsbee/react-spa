/*Main component of the application */
import React, { Component } from 'react';
  //import ReactDOM from 'react-dom';
import AppRouter from '../components/routes.js';
//import './App.css';

//Main component of the app including header,footer and body
export default class App extends Component {
  render() {
    return (
      <div className="App">        
        <AppRouter/>
      </div>
    );
  }
}