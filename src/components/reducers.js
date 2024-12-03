// src/reducers.js
import {UPDATE_CENTERMAP, UPDATE_CLUSTER_FEATURES, UPDATE_LEFTSIDEBAR} from './actions';
import {UPDATE_FEATURESDATA} from "./actions";
import {UPDATE_CHURCHDATA} from "./actions";

const initialState = {
    sidebarData: null,
    featuresData: null,
    centerMap: [12.3350, 45.4350, 12]
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LEFTSIDEBAR:
            return {
                ...state,
                sidebarData: action.payload,
            };
        case UPDATE_CENTERMAP:
            return {
                ...state,
                centerMap: action.payload,
            };

        case UPDATE_CLUSTER_FEATURES:
            return { ...state,
                clusterFeatures: action.payload };

        case UPDATE_FEATURESDATA:
            return {
                ...state,
                featuresData: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
