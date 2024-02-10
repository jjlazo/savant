import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { BookMarked, BookPlus, BookUserIcon, UserCog } from "lucide-react";
// import OpenModalMenuItem from "./OpenModalMenuItem";
import AuthorFormModal from "../ModalForms/CreateAuthorModal";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PoemFormModal from "../ModalForms/CreatePoemModal";
import OpenModalButton from "../OpenModalButton";
// import UserHome from "../UserHome/UserHome";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <ul id="nav-bar">
      <li className="list-items">
        <NavLink to="/"><img id='logo' src="https://i.ibb.co/pwtwzvr/savworm.png" /></NavLink>
      </li>
      <li className="list-items">
        <input placeholder="Search by Author or Poem. . . " id="search-bar" onClick={() => alert("feature coming soon")}></input>
      </li>
      {user ? (<ul id="user-buttons">
        <li className="list-items">
          <OpenModalButton
            buttonText={<BookUserIcon />}
            onButtonClick={closeMenu}
            modalComponent={<AuthorFormModal />}
            className="nav-button"
          />
        </li>
        <li className="list-items">
          <OpenModalButton
            buttonText={<BookPlus />}
            onItemClick={closeMenu}
            modalComponent={<PoemFormModal />}
            className="nav-button"
          />
        </li>
        <li className="list-items">
          <button className="nav-button" onClick={() => navigate(`/users/${user?.id}/bookmarks`)}>
          {<BookMarked/>}
          </button>
        </li>
        <li className="list-items">
          <button className="nav-button" onClick={() => navigate(`/users/${user?.id}/home`)}>
          {<UserCog/>}
          </button>
        </li>
      </ul>) : null}
      <li className="list-items">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
