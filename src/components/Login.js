import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import {Redirect} from "react-router-dom";
import $ from 'jquery';
//import './Login.css';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state={
          loginData:{email:"",password:""},
          toHome: false,
          email:"",
          emailError:"",
          emailErrorFlag:true,
          bodyClass:""
      };
    }

    componentDidMount(){
      //Applying background for login page only
      this.setState({bodyClass:document.body.className}); 
      document.body.className="login-img3-body";
      //login-img3-body
      // If already logged in then set the local state as true
      if(typeof localStorage.getItem("user_details")!=="undefined" && localStorage.getItem("user_details")!==null){
        this.setState({
          toHome: true
        });        
      }
    }

    componentWillUnmount(){
      document.body.className = this.state.bodyClass;
    }

    //Validate blank value for email
    validateEmail(email){
      email.trim() === "" ? this.setState({emailErrorFlag:true}) : this.setState({emailErrorFlag:false});
      return email.trim() === "" ? "Blank Username." : "Valid Username!";
    }  
    //Check email error flag
    onEmailBlur(){
      const { email } = this.state;//fetching the typed username
      console.log(email);
      const emailError = this.validateEmail(email );//fetching the message
      return this.setState({ emailError });//set validation message in local state
    };
  
    //Email change handler function
    onEmailChange(event) {
      this.setState({
        email: event.target.value
      });
    }
    //Handler for login form
    loginSubmitHandler(e){
        e.preventDefault();var self = this;
        //Creating post object carrying username and password
        const items = self.state.loginData;
        items.email = document.loginForm.email.value;
        items.password = document.loginForm.password.value;
        this.setState({loginData:items});
        //Either set state or manually re render/update the component
        // this.forceUpdate();
        console.log("Form submitted: ",self.state.loginData);
        //Check login credentials and set redirect flag:should be restful post in an app
        $.ajax({
          type:"GET",
          url:"./sample-login.json",
          data:self.state.loginData
        }).then(function(response){
          console.log(response);//Response from webservice    
          //return
          if(response.username===self.state.loginData.email && response.password===self.state.loginData.password){
              console.log("Successfully Logged In! Redirecting to home...");
              //Setting user details in localstorage
              let responseJson = {
                id: 474489,
                username: "jns@gmail.com",
                firstName: "Jenifer",
                lastName: "Smith",
                token: '474489JWTTechM123456'
              };
              localStorage.setItem("user_details",JSON.stringify(responseJson));
              self.setState({toHome:true});
          }else{
            alert("Authentication Failed!");
            self.setState({toHome:false});
          }
        },function(err){
          console.log("Service is returning error",err);
          self.setState({toHome:false});
        });
    }

  render(){
    //Redirect to homepage if user has successfully logged in.
    if(this.state.toHome){
      return <Redirect to="/home" />;
    }
    
    return(
     <div className="container">
        <form className="login-form" id="loginForm" name="loginForm" method="POST" action="" onSubmit={this.loginSubmitHandler.bind(this)}>        
          <div className="login-wrap">
            <p className="login-img"><i className="icon_lock_alt" /></p>
            <div className="input-group">
              <span className="input-group-addon"><i className="icon_profile" /></span>
              <input type="text" className="form-control" placeholder="Email please..." ref="email" name="email" id="email" onChange={this.onEmailChange.bind(this)} required />
            </div>
            <div className="input-group">
              <span className="input-group-addon"><i className="icon_key_alt" /></span>
              <input type="password" className="form-control" ref="password" name="password" id="password" placeholder="Password" required />
            </div>
            <label className="checkbox">
              <input type="checkbox" defaultValue="remember-me" /> Remember me
              <span className="pull-right"> <a href="#"> Forgot Password?</a></span>
            </label>
            <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
            {//<button className="btn btn-info btn-lg btn-block" type="submit">Signup</button>
            }
          </div>
        </form>
      </div>
        )
    };
}