export const CREATE_BOOKMARK = 'bookmarks/CREATE_BOOKMARK';
export const READ_BOOKMARKS = 'bookmarks/READ_BOOKMARKS';
export const DELETE_BOOKMARK = 'bookmarks/DELETE_BOOKMARK';

export const readBookmarks = (poems) => ({
  type: READ_BOOKMARKS,
  poems
});

export const createBookmark = (poem) => ({
  type: CREATE_BOOKMARK,
  poem
});

export const deleteBookmark = (poemId) => ({
  type: DELETE_BOOKMARK,
  poemId
});

export const fetchGetAllBookmarks = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/bookmarks`)

    if(response.ok){
      const bookmarks = await response.json()
      dispatch(readBookmarks(bookmarks))
      return bookmarks
    }else{
        const errors = await response.json()
        return errors
    }
}

export const fetchCreateBookmark = (poemId) => async dispatch => {
    const response = await fetch(`/api/poems/${poemId}/bookmarks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.ok){
        const bookmark = await response.json()
        dispatch(createBookmark(bookmark))
        return response
    }else{
        const errors = await response.json()
        return errors
    }
}

export const fetchDeleteBookmark = (poemId) => async dispatch => {
    const response = await fetch(`/api/poems/${poemId}/bookmarks`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })

    if(response.ok){
        dispatch(deleteBookmark(poemId))
    }else{
        const errors = await response.json()
        return errors
    }
}

const bookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_BOOKMARKS: {
      const poemsState = {};
      if(action.poems.Poems.length){
        action.poems.Poems.forEach((poem) => {
          poemsState[poem.id] = poem;
        });
      }
      return poemsState
    }
    case CREATE_BOOKMARK:
      return { ...state, [action.poem.id]: action.poem };
    case DELETE_BOOKMARK: {
      const newState = { ...state };
      delete newState[action.poemId];
      return newState;
    }
    default:
      return state;
  }
};

export default bookmarkReducer;
