import React from 'react';

export default function Sidebar(){
    return(
        <div>
        {/*sidebar start*/}
        <aside>
          <div id="sidebar" className="nav-collapse ">
            {/* sidebar menu start*/}
            <ul className="sidebar-menu">                
              <li>
                <a href="index.html">
                  <i className="icon_house_alt" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li className="sub-menu">
                <a href="javascript:;">
                  <i className="icon_document_alt" />
                  <span>Forms</span>
                  <span className="menu-arrow arrow_carrot-right" />
                </a>
                <ul className="sub">
                  <li><a href="form_component.html">Form Elements</a></li>                          
                  <li><a href="form_validation.html">Form Validation</a></li>
                </ul>
              </li>       
              <li className="sub-menu">
                <a href="javascript:;">
                  <i className="icon_desktop" />
                  <span>UI Fitures</span>
                  <span className="menu-arrow arrow_carrot-right" />
                </a>
                <ul className="sub">
                  <li><a href="general.html">Components</a></li>
                  <li><a href="buttons.html">Buttons</a></li>
                  <li><a href="grids.html">Grids</a></li>
                </ul>
              </li>
              <li>
                <a href="widgets.html">
                  <i className="icon_genius" />
                  <span>Widgets</span>
                </a>
              </li>
              <li>                     
                <a href="chart-chartjs.html">
                  <i className="icon_piechart" />
                  <span>Charts</span>
                </a>
              </li>
              <li className="sub-menu">
                <a href="javascript:;">
                  <i className="icon_table" />
                  <span>Tables</span>
                  <span className="menu-arrow arrow_carrot-right" />
                </a>
                <ul className="sub">
                  <li><a href="basic_table.html">Basic Table</a></li>
                </ul>
              </li>
              <li className="sub-menu ">
                <a href="javascript:;">
                  <i className="icon_documents_alt" />
                  <span>Pages</span>
                  <span className="menu-arrow arrow_carrot-right" />
                </a>
                <ul className="sub">                          
                  <li><a href="profile.html">Profile</a></li>
                  <li><a href="login.html"><span>Login Page</span></a></li>
                  <li><a className="active" href="blank.html">Blank Page</a></li>
                  <li><a href="404.html">404 Error</a></li>
                </ul>
              </li>
            </ul>
            {/* sidebar menu end*/}
          </div>
        </aside>
        {/*sidebar end*/}
        </div>
    );
}