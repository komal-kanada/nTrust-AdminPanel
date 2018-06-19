import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Progress,
} from 'reactstrap';
import { withRouter } from 'react-router';

const propTypes = {
  notif: PropTypes.bool,
  accnt: PropTypes.bool,
  tasks: PropTypes.bool,
  mssgs: PropTypes.bool,
};
const defaultProps = {
  notif: false,
  accnt: false,
  tasks: false,
  mssgs: false,
};

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  dropNotif() {
    const itemsCount = 5;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          {/* <i className="icon-bell"></i><Badge pill color="danger">{itemsCount}</Badge> */}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>You have {itemsCount} notifications</strong></DropdownItem>
          
        </DropdownMenu>
      </Dropdown>
    );
  }
  logout()
  {
    //localStorage.removeItem("saveUser");
    localStorage.clear();
    this.props.history.push("/login");
    //alert("saveUser"+localStorage.getItem("saveUser"))
    
  }
  dropAccnt() {
    return (
     
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
        </DropdownToggle>
     
      <DropdownMenu right>
         <DropdownItem onClick={this.logout.bind(this)} ><i className="fa fa-lock" ></i> Logout</DropdownItem>
         </DropdownMenu>
       </Dropdown>
    );
  }

  dropTasks() {
    const itemsCount = 15;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-list"></i><Badge pill color="warning">{itemsCount}</Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg">
          <DropdownItem header tag="div" className="text-center"><strong>You have {itemsCount} pending tasks</strong></DropdownItem>
          <DropdownItem>
            <div className="small mb-1">Upgrade NPM &amp; Bower <span
              className="float-right"><strong>0%</strong></span></div>
            <Progress className="progress-xs" color="info" value={0}/>
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">ReactJS Version <span className="float-right"><strong>25%</strong></span>
            </div>
            <Progress className="progress-xs" color="danger" value={25}/>
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">VueJS Version <span className="float-right"><strong>50%</strong></span>
            </div>
            <Progress className="progress-xs" color="warning" value={50}/>
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">Add new layouts <span className="float-right"><strong>75%</strong></span>
            </div>
            <Progress className="progress-xs" color="info" value={75}/>
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">Angular 2 Cli Version <span className="float-right"><strong>100%</strong></span></div>
            <Progress className="progress-xs" color="success" value={100}/>
          </DropdownItem>
          <DropdownItem className="text-center"><strong>View all tasks</strong></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropMssgs() {
    const itemsCount = 7;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
        
        <i className="icon-envelope-letter"></i><Badge pill color="purple">{itemsCount}</Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg">
          <DropdownItem header tag="div"><strong>You have {itemsCount} messages</strong></DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="py-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                  <Badge className="avatar-status" color="success"></Badge>
                </div>
              </div>
              <div>
                <small className="text-muted">John Doe</small>
                <small className="text-muted float-right mt-1">Just now</small>
              </div>
              <div className="text-truncate font-weight-bold"><span className="fa fa-exclamation text-danger"></span> Important message</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="py-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                  <Badge className="avatar-status" color="warning"></Badge>
                </div>
              </div>
              <div>
                <small className="text-muted">Jane Doe</small>
                <small className="text-muted float-right mt-1">5 minutes ago</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="py-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                  <Badge className="avatar-status" color="danger"></Badge>
                </div>
              </div>
              <div>
                <small className="text-muted">Janet Doe</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="py-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                  <Badge className="avatar-status" color="info"></Badge>
                </div>
              </div>
              <div>
                <small className="text-muted">Joe Doe</small>
                <small className="text-muted float-right mt-1">4:03 AM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#" className="text-center"><strong>View all messages</strong></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const {notif, accnt, tasks, mssgs,attributes} = this.props;
    return (
      notif ? this.dropNotif() :
      accnt ? this.dropAccnt() :
      tasks ? this.dropTasks() :
      mssgs ? this.dropMssgs() : null
    );
  }
}

HeaderDropdown.propTypes = propTypes;
HeaderDropdown.defaultProps = defaultProps;

export default withRouter(HeaderDropdown);