
import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav, NavItem, NavLink,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

class Business extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: [false, false]
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        
        <Card>
          <CardBody>
            <Nav tabs>
              <NavItem>
                <NavLink href="#" active>Order</NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink href="#">Schedule</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Products&Services</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Business Info</NavLink>
              </NavItem>
            </Nav>
          </CardBody>
        </Card>
       
      </div>
    );
  }
}

export default Business;