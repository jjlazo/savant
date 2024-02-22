import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { BookMarked, BookPlus, BookUserIcon, Regex, UserCog } from "lucide-react";
// import OpenModalMenuItem from "./OpenModalMenuItem";
import AuthorFormModal from "../ModalForms/CreateAuthorModal";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PoemFormModal from "../ModalForms/CreatePoemModal";
import OpenModalButton from "../OpenModalButton";
import { selectAllAuthors } from "../../redux/authors";
import { useModal } from "../../context/Modal";
// import UserHome from "../UserHome/UserHome";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()
  const user = useSelector((store) => store.session.user);
  const allAuthors = useSelector(state => Object.values(selectAllAuthors(state) || {}));
  const allPoems = useSelector(state => Object.values(state.poems || {}));
  const ulRef = useRef();
  const { closeModal } = useModal();

  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const updateSearchResults = (e) => {
    // i === case insensitive :)
    const authors = allAuthors.filter(a => new RegExp(`${searchString}`, 'i').test(a.name)).map(a => ({ ...a, type: "AUTHOR" }));
    const poems = allPoems.filter(p => new RegExp(`${searchString}`, 'i').test(p.title)).map(a => ({ ...a, type: "POEM" }));

    setSearchResults(authors.concat(poems));
  }

  useEffect(() => {
    updateSearchResults();
  }, [searchString, allPoems, allAuthors, updateSearchResults]);

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

  const resultsRef = useRef(null);

  const closeMenu = () => setShowMenu(false);

  const resetSearch = () => {
    setSearchString("");
    setSearchResults([]);
    closeModal();
  }

  return (
    <>
    <ul id="nav-bar">
      <li className="list-items">
        <NavLink to="/"><img id='logo' src="https://i.ibb.co/pwtwzvr/savworm.png" /></NavLink>
      </li>
      <li className="list-items">
        <input placeholder="Search by Author or Poem. . . " id="search-bar" value={searchString} onChange={e => setSearchString(e.target.value)}></input>
      </li>
      {user ? (<ul id="user-buttons">
        <li className="list-items">
          <OpenModalButton
            buttonText={<BookUserIcon />}
            onButtonClick={closeMenu}
            modalComponent={<AuthorFormModal onSuccess={(authorId) => navigate(`/authors/${authorId}`)} />}
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
    {(searchString.length >= 2 && searchResults.length) ? (
      <>
        <div id="search-results-background" onClick={resetSearch} />
        <div id="search-results" ref={resultsRef}>
          {searchResults.map(r => r.type === "POEM"
            ? (
                <div key={`${r.type}-${r.id}`} className="content">
                  <div className="poem-bubble">
                      <div>
                          <div className="poem-header">
                              <div onClick={() => {resetSearch(); navigate(`/poems/${r.id}`)}} className="poem-title">{r?.title}</div>
                          </div>
                          <br/>
                          <div onClick={(e) => { resetSearch(); navigate(`/authors/${r.author_id}`)} } className="poem-author">
                              <b>by {r?.author}</b>
                          </div>
                      </div>
                  </div>
                </div>
            )
            : (
                <div key={`${r.type}-${r.id}`} className="content">
                    <b className="authors-list" onClick={() => { resetSearch(); navigate(`/authors/${r?.id}`)} }>{r?.name}</b>
                </div>
            ))}
        </div>
      </>
    ) : null}
    </>
  );
}

export default Navigation;
