export const CREATE_COMMENT = 'comments/CREATE_COMMENT';
export const READ_COMMENTS = 'comments/READ_COMMENTS';
export const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
export const DELETE_COMMENT = 'comments/DELETE_COMMENT';

export const readComments = (comments) => ({
  type: READ_COMMENTS,
  comments
});

export const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment
});

export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
});

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

export const fetchCommentsByPoemId = (poemId) => async dispatch => {
    const response = await fetch(`/api/poems/${poemId}/comments`)

    if(response.ok){
      const comments = await response.json()
      dispatch(readComments(comments))
    }else{
        const errors = await response.json()
        return errors
    }
}

export const fetchCreateComment = (poemId, comment) => async dispatch => {
    const response = await fetch(`/api/poems/${poemId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })

    if(response.ok){
        const comment = await response.json()
        dispatch(createComment(comment))
        return response
    }else{
        const errors = await response.json()
        return errors
    }
}

export const fetchUpdateComment = (commentId, comment) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })

    if(response.ok){
        const comment = await response.json()
        dispatch(updateComment(comment))
        return
    }else{
        const errors = await response.json()
        return errors
    }
}

export const fetchDeleteComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })

    if(response.ok){
        dispatch(deleteComment(commentId))
        return
    }else{
        const errors = await response.json()
        return errors
    }
}

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_COMMENTS: {
      const commentsState = {};
      if(action.comments.Comments.length){
          action.comments.Comments.forEach((comment) => {
            commentsState[comment.id] = comment;
          });
      }
      return commentsState;
    }
    case CREATE_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case UPDATE_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case DELETE_COMMENT: {
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    }
    default:
      return state;
  }
};

export default commentsReducer;
