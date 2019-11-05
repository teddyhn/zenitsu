import {
    FETCHING_LIBRARY_DATA_START,
    FETCHING_LIBRARY_DATA_SUCCESS,
    FETCHING_LIBRARY_DATA_FAILURE,
    SET_LIBRARY_CONTENT_VIEW
} from '../actions/';

const initialState = {
    contentView: 'grid',
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
        case SET_LIBRARY_CONTENT_VIEW:
            return {
                ...state,
                contentView: action.payload
            }
        default:
            return state;
    }
};