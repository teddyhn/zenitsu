import {
    FETCHING_LIBRARY_DATA_START,
    FETCHING_LIBRARY_DATA_SUCCESS,
    FETCHING_LIBRARY_DATA_FAILURE,
    FETCHING_FILTERED_LIBRARY_ENTRIES_START,
    FETCHING_FILTERED_LIBRARY_ENTRIES_SUCCESS,
    FETCHING_FILTERED_LIBRARY_ENTRIES_FAILURE,
    SET_LIBRARY_DATA,
    SET_LIBRARY_CONTENT_VIEW
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
        case FETCHING_FILTERED_LIBRARY_ENTRIES_START:
            return {
                ...state,
                isLoading: true,
                error: ""
            }
        case FETCHING_FILTERED_LIBRARY_ENTRIES_SUCCESS:
            return {
                ...state,
                libraryData: action.payload,
                isLoading: false
            }
        case FETCHING_FILTERED_LIBRARY_ENTRIES_FAILURE:
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
        default:
            return state;
    }
};