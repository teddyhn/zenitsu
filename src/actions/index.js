import Kitsu from 'kitsu';

const api = new Kitsu();
const userId = localStorage.getItem('userId');

export const FETCHING_LIBRARY_DATA_START = "FETCHING_LIBRARY_DATA_START";
export const FETCHING_LIBRARY_DATA_SUCCESS = "FETCHING_LIBRARY_DATA_SUCCESS";
export const FETCHING_LIBRARY_DATA_FAILURE = "FETCHING_LIBRARY_DATA_FAILURE";
export const SET_LIBRARY_DATA = "SET_LIBRARY_DATA";
export const SET_LIBRARY_CONTENT_VIEW = "SET_LIBRARY_CONTENT_VIEW";
export const SET_LIBRARY_STATUS_FILTER = "SET_LIBRARY_STATUS_FILTER";

export const getLibraryData = (contentTypeFilter) => dispatch => {
    dispatch({ type: FETCHING_LIBRARY_DATA_START });
    api.get(`users/${userId}/library-entries`, {
            filter: {
                kind: contentTypeFilter
            }
        })
        .then(res => {
            dispatch({ type: FETCHING_LIBRARY_DATA_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCHING_LIBRARY_DATA_FAILURE, payload: err.data });
        });
};

export const setLibraryData = (data) => dispatch => {
    dispatch({ type: SET_LIBRARY_DATA, payload: data });
}

export const setLibraryContentView = (view) => dispatch => {
    dispatch({ type: SET_LIBRARY_CONTENT_VIEW, payload: view });
};

export const setLibraryStatusFilter = (filter) => dispatch => {
    dispatch({ type: SET_LIBRARY_STATUS_FILTER, payload: filter });
}