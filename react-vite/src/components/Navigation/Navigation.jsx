import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul id="nav-bar">
      <li className="list-items">
        <NavLink to="/"><img id='logo' src="https://i.ibb.co/pwtwzvr/savworm.png" /></NavLink>
      </li>

      <li className="list-items">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
