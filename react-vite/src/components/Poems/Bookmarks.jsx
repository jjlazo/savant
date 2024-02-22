import React, { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as bookmarkActions from '../../redux/bookmarks'
import Feed from '../Feed'


function Bookmarks() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)
    const bookmarks = useSelector(state => state.bookmarks)
    const { userId } = useParams()

    if (sessionUser?.id !== parseInt(userId, 10)) {
        navigate('/');
    }

    let bookmarksArr = Object.values(bookmarks)
    // let poemsArr = Object.values(poems)

    useEffect(() => {
        async function wrapperFn() {
            const response = await dispatch(bookmarkActions.fetchGetAllBookmarks(sessionUser?.id))
            if (response?.errors) {
                navigate('/errors', { state: { "statusCode": 404, "message": response.errors.message } })
            }
        }

        wrapperFn()
    }, [sessionUser])

    return (
        <div className="home-container">
            <div className="container-content">
                <div className="feed">
                    <div className="poem-header">
                        <div className="poem-content">
                            {state?.username || bookmarksArr[0]?.username}
                        </div>
                        <div className="poem-divider"></div>
                    </div>
                    <Feed data={bookmarksArr} />
                </div>
            </div>
        </div>
    )
}

export default Bookmarks
