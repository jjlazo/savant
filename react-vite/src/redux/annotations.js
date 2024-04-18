import { DELETE_POEM } from "./poems";

export const CREATE_ANNOTATION = 'Annotations/CREATE_ANNOTATION';
export const READ_ANNOTATIONS = 'Annotations/READ_ANNOTATIONS';
export const READ_ANNOTATION = 'Annotations/READ_ANNOTATION';
export const UPDATE_ANNOTATION = 'Annotations/UPDATE_ANNOTATION';
export const DELETE_ANNOTATION = 'Annotations/DELETE_ANNOTATION';

export const readAnnotations = (annotations) => ({
  type: READ_ANNOTATIONS,
  annotations
});

export const readAnnotation = (annotation) => ({
  type: READ_ANNOTATIONS,
  annotation
});

export const createAnnotation = (annotation) => ({
  type: CREATE_ANNOTATION,
  annotation
});

export const updateAnnotation = (annotation) => ({
  type: UPDATE_ANNOTATION,
  annotation
});

export const deleteAnnotation = (annotationId) => ({
  type: DELETE_ANNOTATION,
  annotationId
});

export const fetchAnnotationsbyPoemId = (poemId) => async dispatch => {
  const response = await fetch(`/api/poems/${poemId}/annotations`)

  if (response.ok) {
    const annotations = await response.json()
    dispatch(readAnnotations(annotations))
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchAnnotationById = (annotationId) => async dispatch => {
  const response = await fetch(`/api/annotations/${annotationId}`)

  if (response.ok) {
    const annotation = await response.json()
    dispatch(readAnnotation(annotation))
    return annotation
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchCreateAnnotation = (poemId, annotation) => async dispatch => {
  const response = await fetch(`/api/${poemId}/annotations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(annotation)
  })

  if (response.ok) {
    const annotation = await response.json()
    dispatch(createAnnotation(annotation))
    return {ok: response.ok, ...annotation}
  } else {
    const errors = await response.json()
    return {ok: response.ok, errors}
  }
}

export const fetchUpdateAnnotation = (annotation, annotationId) => async dispatch => {
  const response = await fetch(`/api/annotations/${annotationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(annotation)
  })

  if (response.ok) {
    const annotation = await response.json()
    dispatch(updateAnnotation(annotation))
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchDeleteAnnotation = (annotationId) => async dispatch => {
  const response = await fetch(`/api/annotations/${annotationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })

  if (response.ok) {
    dispatch(deleteAnnotation(annotationId))
  } else {
    const errors = await response.json()
    return errors
  }
}

export const getAnnotationsByUserId = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}/user-annotations`)

  if (response.ok) {
    const annotations = await response.json()
    dispatch(readAnnotations(annotations))
    return response
  } else {
    const errors = await response.json()
    return errors
  }
}

const annotationsReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_ANNOTATIONS: {
      const annotationState = { ...state };
      if (action.annotations.Annotations.length) {
        action.annotations.Annotations.forEach((note) => {
          annotationState[note.id] = note;
        });
      }
      return annotationState;
    }
    case READ_ANNOTATION: {
      const annotationState = { ...state };
      const annotation = action.annotation.Annotation;
      annotationState[annotation.id] = annotation;
      return annotationState;
    }
    case CREATE_ANNOTATION:
      return { ...state, [action.annotation.id]: action.annotation };
    case UPDATE_ANNOTATION:
      return { ...state, [action.annotation.id]: action.annotation };
    case DELETE_ANNOTATION: {
      const annotationState = { ...state };
      delete annotationState[action.annotationId];
      return annotationState;
    }
    case DELETE_POEM: {
      const newState = { ...state }
      for (const noteId of action.noteIds) {
        delete newState[noteId];
      }
      return newState
    }
    default:
      return state;
  }
};

export default annotationsReducer;
