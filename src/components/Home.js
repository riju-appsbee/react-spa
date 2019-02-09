import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import {Redirect,Link} from "react-router-dom";
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import $ from 'jquery';
import globalState from '../components/globalState.js';
import Header from '../components/header.js';
import Sidebar from '../components/sidebar.js';

export default class Home extends Component{

  constructor(props) {
    super(props);
    //this.props.userDetails = JSON.parse(localStorage.getItem("user_details"));
    this.state = {
      isAuthenticated:true,
      userData: [],
      showMsg:false,
      modal: false,
      userDetails: {},
      userDescription:{company:{name:"",bs:"",catchPhrase:""}}
    };
    // this.updateRecords = this.updateRecords.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.toggleMessage = this.toggleMessage.bind(this);
    // this.toggle = this.toggle.bind(this);
    }
  
  
  /*
  componentDidMount is executed after the first render only on the client side. This is where AJAX requests and DOM or state updates should occur. This method is also used for integration with other JavaScript frameworks and any functions with delayed execution such as setTimeout or setInterval. 
  */
  componentDidMount(){
    console.log("Lets update the local state and call AJAX!");let self = this;
    //Only for an authenticated user,we'll call ajax
    if(typeof localStorage.getItem("user_details")!=="undefined" && localStorage.getItem("user_details")!==null){
      //Setting logged in user's name,id etc. in localstate
      self.setState({
        userDetails: JSON.parse(localStorage.getItem("user_details")),
        isAuthenticated: true
      });
      //calling ajax and setting the response in a local state
      /*fetch('./sample-data.json').then(response => response.json()).then(json => {
        console.log(json);
        this.setState({userData:json});
      });*/
      $.ajax({
        url:'./sample-data.json',
        type:'GET'
      }).then(function(response){
        console.log("AJAX Response:",response);
        self.setState({userData:response});
        globalState.userData = self.state.userData;
      });
      
    }
    //If anyone trying to access this page without logging in,updating a local sate as false
    else{
      self.setState({isAuthenticated:false});
    }
  };

  
  viewRow(i){
    var self = this;
    const userObject = this.state.userData[i];
    self.setState({userDescription:userObject});
     setTimeout(function(){
      console.log("Details in Modal",self.state.userDescription);
     },500);
    
  }
 
  deleteRow(i){
    console.log("swap delete row",i);
    const items = this.state.userData;
    items.splice(i,1);
    this.setState({userData:items});
  }
  

  render(){
    
    /*var hideMessage = {
      display: 'none'
    }*/
    //If some one will try to access this page without logging in
    if(this.state.isAuthenticated===false){
      return <Redirect to="/unauth" />
    }
    return(
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
                <h3 className="page-header"><i className="fa fa fa-bars" /> Pages</h3>
                <ol className="breadcrumb">
                  <li><i className="fa fa-home" />
                  <Link to={'/home'}> Home </Link>
                  </li>
                  <li><i className="fa fa-bars" />Pages</li>
                  <li><i className="fa fa-square-o" />Pages</li>
                </ol>
              </div>
            </div>
            {/* page start*/}
            <div className="row">
            <div className="col-sm-12">
                      <section className="panel">
                          <header className="panel-heading">
                              List Of Users
                          </header>
                          <table className="table">
                              <thead>
                              <tr>
                                  <th>#</th>
                                  <th>ID</th>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Action</th>
                              </tr>
                              </thead>
                              <tbody>
                              {this.state.userData.map((item,i) => 
                              <tr key={i}>
                                <td>{i+1}</td>
                                <td>USR00{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td><div className="btn-group">
                                      <a className="btn btn-primary" onClick={(e)=>this.viewRow(i)} data-toggle="modal" data-target="#myModal"><i className="fa fa-eye"></i></a>
                                      <Link to={'/form/'+item.id} className="btn btn-success" user={this.state.userData}><i className="fa fa-edit"></i></Link>
                                      <a className="btn btn-danger" href="javascript:;" onClick={(e)=>this.deleteRow(i)}><i className="fa fa-times"></i></a>
                                  </div></td>
                              </tr>)}
                              </tbody>
                          </table>
                          <div className="text-center">
                                  <ul className="pagination pagination-sm">
                                      <li><a href="#">«</a></li>
                                      <li><a href="#">1</a></li>
                                      <li><a href="#">2</a></li>
                                      <li><a href="#">3</a></li>
                                      <li><a href="#">4</a></li>
                                      <li><a href="#">5</a></li>
                                      <li><a href="#">»</a></li>
                                  </ul>
                              </div>
                      </section>
                  </div>
                  </div>

                   
                  <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                  <h4 className="modal-title">Full Details</h4>
                              </div>
                              <div className="modal-body">
                              <p>Name: {this.state.userDescription.name}</p>
                              <p>Nickname: {this.state.userDescription.username}</p>  
                              <p>Email: {this.state.userDescription.email}</p>                            
                              <p>Phone: {this.state.userDescription.phone}</p>                            
                              <p>Website: {this.state.userDescription.website}</p>                            
                              <p>Company: {this.state.userDescription.company.name},{this.state.userDescription.company.catchPhrase},{this.state.userDescription.company.bs}</p>                            
                              </div>
                              <div className="modal-footer">
                                  <button data-dismiss="modal" className="btn btn-success" type="button">Done</button>
                              </div>
                          </div>
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