import {
    FETCHING_LIBRARY_DATA_START,
    FETCHING_LIBRARY_DATA_SUCCESS,
    FETCHING_LIBRARY_DATA_FAILURE,
    SET_LIBRARY_DATA,
    SET_LIBRARY_CONTENT_VIEW,
    SET_LIBRARY_STATUS_FILTER
} from '../actions/';

const initialState = {
    contentView: 'grid',
    statusFilter: 'all',
    libraryData: [],
    cached: [],
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
                cached: action.payload,
                isLoading: false
            }
        case FETCHING_LIBRARY_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case SET_LIBRARY_DATA:
            return {
                ...state,
                libraryData: action.payload
            }
        case SET_LIBRARY_CONTENT_VIEW:
            return {
                ...state,
                contentView: action.payload
            }
        case SET_LIBRARY_STATUS_FILTER:
            return {
                ...state,
                statusFilter: action.payload
            }
        default:
            return state;
    }
};