import {
    FETCHING_LIBRARY_DATA_START,
    FETCHING_LIBRARY_DATA_SUCCESS,
    FETCHING_LIBRARY_DATA_FAILURE
} from '../actions/';

const initialState = {
    libraryData: [],
    isLoading: false
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_LIBRARY_DATA_START:
            return {
                ...state,
                isLoading: true,
                error: ""
            }
        case FETCHING_LIBRARY_DATA_SUCCESS:
            return {
                ...state,
                libraryData: action.payload,
                isLoading: false
            }
        case FETCHING_LIBRARY_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
};