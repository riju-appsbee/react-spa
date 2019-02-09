import React from 'react';
import {Redirect,Link} from "react-router-dom";
//import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import globalState from '../components/globalState.js';
import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';
import $ from 'jquery';
import moment from 'moment';
import timezone from 'moment-timezone';
// import { ValidatorForm,ValidatorComponent } from 'react-form-validator-core';
// import ValidateableForm from 'react-form-validate';
// import SimpleReactValidator from 'simple-react-validator';


export default class MyForm extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      isAuthenticated:true,
      userData: [],
      showMsg:false,
      modal: false,
      userDetails: {},
      formData: {},
      toDay: moment().tz('Asia/Kolkata').format("DD/MM/YYYY"),
      listOfCities: [{id:42,name:"Kolkata"},{id:43,name:"Bangalore"},{id:44,name:"Pune"}],
      changedCityId:"",
      isValidated: false
    };

    


  }

  componentDidMount(){
    var self = this;    
    console.log("Current Time In Kolkata",moment().tz('Asia/Kolkata').format());
    
    //Adding the validation script available with this theme
    //<!-- custom form validation script-->
    //<script src="../js/form-validation-script.js"></script>
    /*const script = document.createElement("script");
    script.src = "../js/form-validation-script.js";
    script.async = true;//Keeping things in sync not in sequential order
    document.body.appendChild(script);*/

      
    if(typeof localStorage.getItem("user_details")!=="undefined" && localStorage.getItem("user_details")!==null){
      //Setting logged in user's name,id etc. in localstate
      self.setState({
        userDetails: JSON.parse(localStorage.getItem("user_details")),
        isAuthenticated: true
      });
    let userData = globalState.userData;
    console.log(self.props.match.params.id,typeof userData,userData);
    if(typeof userData!=='Object' && userData!=null){
      //Using global state like rootscope
      for(var i=0;i<userData.length;i++){
        if(userData[i].id==self.props.match.params.id){
          self.setState({
            formData:{
              name:userData[i].name,
              email:userData[i].email,
              phone:userData[i].phone,
              website:userData[i].website,
              workLocation:{id:42,name:"Kolkata"}
            }},function(){
              //Setting an already selected value for the work location datalist
              document.user_form.cities.defaultValue = self.state.formData.workLocation.name;
            });
        }
      }
    }else{

      $.ajax({
        url:'../sample-data.json',
        type:'GET'
      }).then(function(response){
        console.log("AJAX Response:",response);
        var userData = response;
        for(var i=0;i<userData.length;i++){
          if(userData[i].id==self.props.match.params.id){

            self.setState({
              formData:{
                name:userData[i].name,
                email:userData[i].email,
                phone:userData[i].phone,
                website:userData[i].website,
                workLocation:{id:42,name:"Kolkata"}
              }},function(){
                //Setting an already selected value for the work location datalist
                document.user_form.cities.defaultValue = self.state.formData.workLocation.name;
              });
          }
        }
      });
    }
  }
  
  };

  
  changeWorkLocation(event,list){
    // console.log(event.target.value,list);
    list.forEach(item => {
      console.log(item.name)
      if(item.name.trim()===event.target.value.trim())
      console.log(item.id);
      this.setState({changedCityId:item.id});
    });
    
  }

  //Form submit handler function
  userFormSubmitHandler(event){
    console.log("Clicked to submit!");
    event.preventDefault();
    var self = this;
      //If the call of the validate method was successful, we can proceed with form submission. Otherwise we do nothing.
    if (self.validate()) {
      const updatedData = {
        name: document.user_form.name.value,
        email: document.user_form.email.value,
        phone: document.user_form.phone.value,
        website: document.user_form.url.value,
        workLocation: {id:self.state.changedCityId,name:document.user_form.cities.value},
        doj: document.user_form.doj.value
      };
      self.setState({formData:updatedData},function(){
        console.log("Lets post data!",self.state.formData);
      });
    }
    self.setState({ isValidated: true });
  }

    /**
   * Them main function that validates the form and fills in the error messages.
   * @returns bool Returns a boolean showing if the form is valid for submission or not.
   **/
  validate() {
    //this.formEl is a reference in the component to the form DOM element.
    const formEl = document.user_form;
    const formLength = formEl.length;

    /*
    * The checkValidity() method on a form runs the 
    * html5 form validation of its elements and returns the result as a boolean.
    * It returns 'false' if at least one of the form elements does not qualify,
    * and 'true', if all form elements are filled with valid values.
    */
    if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        //the i-th child of the form corresponds to the forms i-th input element
        const elem = formEl[i];
        /*
        * errorLabel placed next to an element is the container we want to use 
        * for validation error message for that element
        */
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");

        /*
        * A form element contains also any buttuns contained in the form.
        * There is no need to validate a button, so, we'll skip that nodes.
        */
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          /*
          * Each note in html5 form has a validity property. 
          * It contains the validation state of that element.
          * The elem.validity.valid property indicates whether the element qualifies its validation rules or no.
          * If it does not qualify, the elem.validationMessage property will contain the localized validation error message.
          * We will show that message in our error container if the element is invalid, and clear the previous message, if it is valid.
          */
          if (!elem.validity.valid) {
            console.log(elem,elem.name,elem.validationMessage);
            errorLabel.textContent = elem.validationMessage;
          } else {
            errorLabel.textContent = "";
          }
        }
      }

      //Return 'false', as the formEl.checkValidity() method said there are some invalid form inputs.
      return false;
    } else {
      //The form is valid, so we clear all the error messages
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          errorLabel.textContent = "";
        }
      }

      //Return 'true', as the form is valid for submission
      return true;
    }
  };


  render() {
    
    //If some one will try to access this page without logging in
    if(this.state.isAuthenticated===false){
      return <Redirect to="/unauth" />
    }
    
    return (
      <div>
      {/* container section start */}
      <section id="container">
      <Header userdetails={this.state.userDetails} />
        <Sidebar />
        {/*main content start*/}
      <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="page-header"><i className="fa fa-files-o" /> Form Validation</h3>
              <ol className="breadcrumb">
                <li><i className="fa fa-home" /><Link to="/home">Home</Link></li>
                <li><i className="icon_document_alt" />Forms</li>
                <li><i className="fa fa-files-o" />Form Validation</li>
              </ol>
            </div>
          </div>
          {/* Form validations */}              
          <div className="row">
            <div className="col-lg-12">
              <section className="panel">
                <header className="panel-heading">
                  User Details
                </header>
                <div className="panel-body">
                  <div className="form">
                  
                    <form className="form-validate form-horizontal" name="user_form" id="feedback_form" 
 method="POST" action="" onSubmit={this.userFormSubmitHandler.bind(this)} noValidate>
                      <div className="form-group">
                        <label htmlFor="cname" className="control-label col-lg-2">Full Name <span className="required">*</span></label>
                        <div className="col-lg-10">
                          <input className="form-control" defaultValue={this.state.formData.name} id="cname" name="name" minLength={5} type="text" required />
                          <div className="invalid-feedback text-danger" />
                        </div>
                      </div>
                      <div className="form-group ">
                        <label htmlFor="cemail" className="control-label col-lg-2">E-Mail <span className="required">*</span></label>
                        <div className="col-lg-10">
                          <input className="form-control" defaultValue={this.state.formData.email} id="cemail" type="email" name="email" />
                          <div className="invalid-feedback text-danger" />
                        </div>
                      </div>
                      <div className="form-group ">
                        <label htmlFor="curl" className="control-label col-lg-2">Website</label>
                        <div className="col-lg-10">
                          <input className="form-control " defaultValue={this.state.formData.website} id="curl" type="url" name="url" />
                          <div className="invalid-feedback text-danger" />
                        </div>
                      </div>                                                            
                      <div className="form-group ">
                        <label htmlFor="phone" className="control-label col-lg-2">Phone</label>
                        <div className="col-lg-10">
                          <input className="form-control" id="phone" name="phone" required defaultValue={this.state.formData.phone}></input>
                          <div className="invalid-feedback text-danger" />
                        </div>
                      </div>
                      <div className="form-group ">
                        <label htmlFor="cities" className="control-label col-lg-2">Work Location</label>
                        <div className="col-lg-10">
                          <input className="form-control" list="cities" name="cities" onChange={(e)=>this.changeWorkLocation(e,this.state.listOfCities)}></input>
                          <datalist id="cities">
                          {this.state.listOfCities.map((item,i) =>
                            <option key={i} data-value={item.id}>{item.name}</option>
                          )}
                          </datalist>                          
                        </div>
                      </div>
                      <div className="form-group ">
                        <label htmlFor="phone" className="control-label col-lg-2">Date of Joining</label>
                        <div className="col-lg-10 input-group">
                          <input defaultValue={this.state.toDay} data-provide="datepicker" data-date-autoclose="true" data-date-format="dd/mm/yyyy" data-date-start-date="-5y" data-date-end-date="+1y" className="form-control" id="doj" name="doj"></input>
                          <div className="input-group-addon">
                            <span className="glyphicon glyphicon-th"></span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-lg-offset-2 col-lg-10">
                          <button className="btn btn-primary" type="submit">Save</button>
                          &nbsp;
                          <button className="btn btn-default" type="button">Cancel</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>          
          {/* page end*/}
        </section>
      </section>
      {/*main content end*/}
      </section>
      {/* container section end */}   
      </div>      
    );
  }
}