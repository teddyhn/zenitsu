import Kitsu from 'kitsu';

const api = new Kitsu();
const userId = localStorage.getItem('userId');

export const FETCHING_LIBRARY_DATA_START = "FETCHING_LIBRARY_DATA_START";
export const FETCHING_LIBRARY_DATA_SUCCESS = "FETCHING_LIBRARY_DATA_SUCCESS";
export const FETCHING_LIBRARY_DATA_FAILURE = "FETCHING_LIBRARY_DATA_FAILURE";
export const FETCHING_FILTERED_LIBRARY_ENTRIES_START = "FETCHING_FILTERED_LIBRARY_ENTRIES_START";
export const FETCHING_FILTERED_LIBRARY_ENTRIES_SUCCESS = "FETCHING_FILTERED_LIBRARY_ENTRIES_SUCCESS";
export const FETCHING_FILTERED_LIBRARY_ENTRIES_FAILURE = "FETCHING_FILTERED_LIBRARY_ENTRIES_FAILURE";
export const SET_LIBRARY_DATA = "SET_LIBRARY_DATA";
export const SET_LIBRARY_CONTENT_VIEW = "SET_LIBRARY_CONTENT_VIEW";

export const getLibraryData = (contentTypeFilter) => dispatch => {
    dispatch({ type: FETCHING_LIBRARY_DATA_START });
    api.get(`library-entries`, {
            filter: {
                userId: userId,
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

export const getFilteredLibraryEntries = (contentTypeFilter, status) => (dispatch, getState) => {
    dispatch({ type: FETCHING_FILTERED_LIBRARY_ENTRIES_START });

    if (getState().cached[status]) {
        return dispatch({ type: FETCHING_LIBRARY_DATA_SUCCESS, payload: getState().cached[status] });
    }

    api.get(`library-entries`, {
            filter: {
                userId: userId,
                kind: contentTypeFilter,
                status: status
            }
        })
        .then(res => {
            dispatch({ type: FETCHING_FILTERED_LIBRARY_ENTRIES_SUCCESS, payload: res.data, query: status });
        })
        .catch(err => {
            dispatch({ type: FETCHING_FILTERED_LIBRARY_ENTRIES_FAILURE, payload: err.data });
        })
}

export const setLibraryData = (data) => dispatch => {
    dispatch({ type: SET_LIBRARY_DATA, payload: data });
}

export const setLibraryContentView = (view) => dispatch => {
    dispatch({ type: SET_LIBRARY_CONTENT_VIEW, payload: view });
}