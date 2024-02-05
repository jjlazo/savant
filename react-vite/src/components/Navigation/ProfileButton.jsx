import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import AuthorFormModal from "../ModalForms/CreateAuthorModal";
import PoemFormModal from "../ModalForms/CreatePoemModal";
import { BookMarked } from "lucide-react";
import Bookmarks from "../Poems/Bookmarks";
import { Link } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button onClick={toggleMenu} id="profile-button">
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div id="profile-popup-menu">
              <li className="menu-li">Hello, {user.username}</li>
              <li className="menu-li">{user.email}</li>
              <li id="create-author">
              <OpenModalMenuItem
                  itemText="Create an Author"
                  onItemClick={closeMenu}
                  modalComponent={<AuthorFormModal />}
                />
              </li>
              <li id="create-poem">
              <OpenModalMenuItem
                  itemText="Create a Poem"
                  onItemClick={closeMenu}
                  modalComponent={<PoemFormModal />}
                />
              </li>
              <li id="read-bookmarks">
                <Link to={`/users/${user.id}/bookmarks`} id="bookmarks-link" onClick={closeMenu}>Bookmarks</Link>
              </li>
              <li id="lg-butt-cont">
                <button onClick={logout} id="logout-button">Log Out</button>
              </li>
            </ div>
          ) : (
            <div id="popup-menu">
              <p className="list-item">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </p>
              <p className="list-item">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </p>
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
