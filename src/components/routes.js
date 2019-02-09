import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MyForm from '../components/Form.js';
import Home from '../components/Home.js';
import Login from '../components/Login.js';
import Logout from '../components/Logout.js';
import Unauth from '../components/Unauth.js';

//Routing component of the app - route.js
export default function AppRouter(){  
    return(
      /*Define routing of the app*/
      <Router>
          <Switch>
          < Route exact path='/' component={Login} />
          < Route exact path='/login' component={Login} />
          < Route exact path='/logout' component={Logout} />
          < Route exact path='/unauth' component={Unauth} />
          < Route exact path='/home' component={Home} />
          < Route exact path='/form/:id' component={MyForm} />          
          <Route component={Unauth} />{/*Default 404*/}
          </Switch>          
      </Router>
        )    
}