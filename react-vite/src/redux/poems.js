export const CREATE_POEM = 'Poems/CREATE_POEM';
export const READ_POEMS = 'Poems/READ_POEMS';
export const READ_POEM = 'Poems/READ_POEM';
export const UPDATE_POEM = 'Poems/UPDATE_POEM';
export const DELETE_POEM = 'Poems/DELETE_POEM';

export const readPoems = (poems) => ({
  type: READ_POEMS,
  poems
});

export const readPoem = (poem) => ({
  type: READ_POEM,
  poem
});

export const createPoem = (poem) => ({
  type: CREATE_POEM,
  poem
});

export const updatePoem = (poem) => ({
  type: UPDATE_POEM,
  poem
});

export const deletePoem = (poemId) => ({
  type: DELETE_POEM,
  poemId
});

export const fetchPoems = () => async dispatch => {
  const response = await fetch(`/api/poems`)

  if (response.ok) {
    const poems = await response.json()
    dispatch(readPoems(poems))
    // return poems
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchPoemById = (poemId) => async dispatch => {
  const response = await fetch(`/api/poems/${poemId}`)

  if (response.ok) {
    const poem = await response.json()
    dispatch(readPoem(poem))
    return poem
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchCreatePoem = (poem) => async dispatch => {
  const response = await fetch(`/api/poems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(poem)
  })

  if (response.ok) {
    const poem = await response.json()
    dispatch(createPoem(poem))
    return poem
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchUpdatePoem = (poemId, poem) => async dispatch => {
  const response = await fetch(`/api/poems/${poemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(poem)
  })

  if (response.ok) {
    const poem = await response.json()
    dispatch(updatePoem(poem))
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchDeletePoem = (poemId) => async dispatch => {
  const response = await fetch(`/api/poems/${poemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })

  if (response.ok) {
    dispatch(deletePoem(poemId))
  } else {
    const errors = await response.json()
    return errors
  }
}

export const getPoemsByAuthorId = (authorId) => async dispatch => {
  const response = await fetch(`/api/authors/${authorId}/poems`)

  if (response.ok) {
    const poems = await response.json()
    dispatch(readPoems(poems))
    return response
  } else {
    const errors = await response.json()
    return errors
  }
}

const poemsReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_POEMS: {
      const poemsState = {};
      if (action.poems.Poems.length) {
        action.poems.Poems.forEach((poem) => {
          poemsState[poem.id] = poem;
        });
      }
      return poemsState;
    }
    case READ_POEM: {
      const poemsState = {};
      const poem = action.poem.Poem
      poemsState[poem.id] = poem
      return poemsState;
    }
    case CREATE_POEM:
      return { ...state, [action.poem.id]: action.poem };
    case UPDATE_POEM:
      return { ...state, [action.poem.id]: action.poem };
    case DELETE_POEM: {
      const newState = { ...state };
      delete newState[action.poemId];
      return newState;
    }
    default:
      return state;
  }
};

export default poemsReducer;
