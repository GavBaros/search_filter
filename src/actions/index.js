import api from "../api/api";

//redux-thunk feeds the action creator with dispatch AND getState as second argument.
export const fetchData = type => (dispatch, getState) => {
  //for loading spinner later
  dispatch({
    type: "FETCHING_DATA"
  });

  console.log("Making request with criteria: ", getState().data.criteria);

  api
    .post("/vehicles", getState().data.criteria)
    .then(response => {
      dispatch({
        type: "FETCH_DATA_SUCCESS",
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: "FETCH_DATA_ERROR",
        payload: err
      });
    });
};

export const editCriteria = (name, value, minName, maxName) => dispatch => {
  if (name instanceof Object && !(name instanceof Array)) {
    //if name is a sure object, edit criteria object with each property and value that name has
    return Object.keys(name).forEach(key => {
      dispatch({
        type: "EDIT_CRITERIA",
        payload: { [key]: name[key] }
      });
    });
  } else if (minName && maxName) {
    //this block handles slider/range input values
    dispatch({
      type: "EDIT_CRITERIA",
      payload: { [minName]: value.min, [maxName]: value.max }
    });
  } else if (name === "tags") {
    //tags need an array as its value for the backend
    dispatch({
      type: "EDIT_CRITERIA",
      payload: { [name]: value === "" ? "" : [value] }
    });
  } else if (!name && !minName && !maxName) {
    //handles sort dropdown values
    dispatch({
      type: "EDIT_CRITERIA",
      payload: {
        order_by: value.order_by,
        order_direction: value.order_direction
      }
    });
  } else {
    //handles all other dropdown values
    dispatch({
      type: "EDIT_CRITERIA",
      payload: { [name]: value }
    });
  }
};

export const resetCriteria = obj => {
  return {
    type: "RESET_CRITERIA",
    payload: obj
  };
};
