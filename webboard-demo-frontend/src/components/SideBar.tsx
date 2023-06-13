import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface SideBarProps {
    isOpen: boolean;
    toggle: () => void
}

const SideBar = ({ isOpen, toggle }: SideBarProps) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Object Storage Demo</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <NavItem>
          <NavLink tag={Link} to={"/"}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/attachments"}>
            Attachments
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

export default SideBar;
