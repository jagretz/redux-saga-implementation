import axios from "axios";
import { call, put } from "./effects";

const RANDOM_CAT_URL = "https://aws.random.cat/meow";

export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILED = "FETCH_DATA_FAILED";

const initialState = (overrides) => ({
    url: "",
    error: "",
    ...overrides,
});

export const reducer = (state = initialState(), action) => {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return {
                url: action.payload,
                // clear the error (message)
                error: "",
            };
        case FETCH_DATA_FAILED:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

/**
 * Create and return a redux action.
 *
 * @returns {ReduxAction} with the payload
 */
export const fetchData = () => ({ type: FETCH_DATA_REQUEST });

/**
 * Takes a url and delegates to {@Link axios.get}
 *
 * @param {string} url to fetch
 * @returns {Promise} intended to resolve to provided URL
 */
const fetchFromUrl = (url) => axios.get(url);

export function* fetchDataSaga() {
    try {
        const response = yield call(fetchFromUrl, RANDOM_CAT_URL);

        yield put({ type: FETCH_DATA_SUCCESS, payload: response.data.file });
    } catch (error) {
        yield put({ type: FETCH_DATA_FAILED, payload: error.message });
    }
}
