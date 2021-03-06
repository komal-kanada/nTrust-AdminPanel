// import React, {Component} from 'react';
// import {
//   Nav,
//   NavItem,
//   NavbarToggler,
//   NavbarBrand,
// } from 'reactstrap';

// class Header extends Component {

//   sidebarToggle(e) {
//     e.preventDefault();
//     document.body.classList.toggle('sidebar-hidden');
//   }

//   sidebarMinimize(e) {
//     e.preventDefault();
//     document.body.classList.toggle('sidebar-minimized');
//   }

//   mobileSidebarToggle(e) {
//     e.preventDefault();
//     document.body.classList.toggle('sidebar-mobile-show');
//   }

//   asideToggle(e) {
//     e.preventDefault();
//     document.body.classList.toggle('aside-menu-hidden');
//   }

//   render() {
//     return (
      
//       <header className="app-header navbar">
     
//         <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
//           <span className="navbar-toggler-icon"></span>
//         </NavbarToggler>
//         {/* <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
//           <span className="navbar-toggler-icon"></span>
//         </NavbarToggler> */}
        
         
//         <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
//           <span className="navbar-toggler-icon"></span>
//         </NavbarToggler>
        
//       </header>
     
      
//     );
//   }
// }

// export default Header;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import HeaderDropdown from './Headerdropdown';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"/>
        </NavbarToggler>
        <NavbarBrand/>
        <NavbarToggler className= "d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"/>
        </NavbarToggler>
      <Nav className="ml-auto" navbar>
          <HeaderDropdown notif/>
          
          <HeaderDropdown accnt/>
        </Nav>
      
      </header>
    );
  }
}

export default Header;
