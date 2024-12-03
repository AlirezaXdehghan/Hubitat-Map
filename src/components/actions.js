// src/actions.js
export const UPDATE_LEFTSIDEBAR = 'UPDATE_SIDEBAR';
export const UPDATE_FEATURESDATA = 'UPDATE_FEATURESDATA';

export const UPDATE_CENTERMAP = 'UPDATE_CENTERMAP'

export const UPDATE_CLUSTER_FEATURES = 'UPDATE_CLUSTER_FEATURES'

export const updateSidebar = (data) => ({
    type: UPDATE_LEFTSIDEBAR,
    payload: data,
});

export const updateCenterMap = (data) => ({
    type: UPDATE_CENTERMAP,
    payload: data,
});

export const updateClusterFeatures = (data) => ({
    type: UPDATE_CLUSTER_FEATURES,
    payload: data,
});


export const updateFeatures = (data) => ({
    type: UPDATE_FEATURESDATA,
    payload: data,
});