export const CREATE_AUTHOR = 'Authors/CREATE_AUTHOR';
export const READ_AUTHORS = 'Authors/READ_AUTHORS';
export const READ_AUTHOR = 'Authors/READ_AUTHOR';
export const UPDATE_AUTHOR = 'Authors/UPDATE_AUTHOR';
export const DELETE_AUTHOR = 'Authors/DELETE_AUTHOR';

export const readAuthors = (authors) => ({
  type: READ_AUTHORS,
  authors
});

export const readAuthor = (author) => ({
  type: READ_AUTHOR,
  author
});

export const createAuthor = (author) => ({
  type: CREATE_AUTHOR,
  author
});

export const updateAuthor = (author) => ({
  type: UPDATE_AUTHOR,
  author
});

export const deleteAuthor = (authorId) => ({
  type: DELETE_AUTHOR,
  authorId
});

export const fetchAuthors = () => async dispatch => {
    const response = await fetch(`/api/authors`)

    if(response.ok){
      const authors = await response.json()
      dispatch(readAuthors(authors))
      return authors
    }else{
        const errors = await response.json()
        return errors
    }
}

export const fetchAuthorById = (authorId) => async dispatch => {
    const response = await fetch(`/api/authors/${authorId}`)

    if(response.ok){
      const author = await response.json()
      dispatch(readAuthor(author))
      return author
    }else{
        const errors = await response.json()
        return errors
    }
}

export const fetchCreateAuthor = (author) => async dispatch => {
    const response = await fetch(`/api/authors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(author)
    })

    if(response.ok){
        const author = await response.json()
        dispatch(createAuthor(author))
        return author
    }else{
        const errors = await response.json()
        return errors
    }
}

export const fetchUpdateAuthor = (authorId, author) => async dispatch => {
    const response = await fetch(`/api/authors/${authorId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(author)
    })

    if(response.ok){
        const author = await response.json()
        dispatch(updateAuthor(author))
    }else{
        const errors = await response.json()
        return errors
    }
}

export const fetchDeleteAuthor = (authorId) => async dispatch => {
    const response = await fetch(`/api/authors/${authorId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })

    if(response.ok){
        dispatch(deleteAuthor(authorId))
    }else{
        const errors = await response.json()
        return errors
    }
}

const authorsReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_AUTHORS: {
      const authorsState = {};
      if(action.authors.Authors.length){
          action.authors.Authors.forEach((author) => {
            authorsState[author.id] = author;
          });
      }
      return authorsState;
    }
    case READ_AUTHOR: {
      const authorsState = {};
      const author = action.author.Author
      authorsState[author.id] = author
      return authorsState;
    }
    case CREATE_AUTHOR:
      return { ...state, [action.author.id]: action.author };
    case UPDATE_AUTHOR:
      return { ...state, [action.author.id]: action.author };
    case DELETE_AUTHOR: {
      const newState = { ...state };
      delete newState[action.authorId];
      return newState;
    }
    default:
      return state;
  }
};

export default authorsReducer;
