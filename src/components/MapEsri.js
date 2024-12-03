import React, { useEffect, useRef, useState } from 'react';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import '@arcgis/core/assets/esri/themes/light/main.css';
import './MapEsri.css';
import { updateSidebar, updateClusterFeatures } from './actions';
import store from "./store";
import { useSelector } from "react-redux";
import CustomDropdown from './CustomDropdown';

const MapEsri = () => {
    const mapRef = useRef(null);
    const mapCenterCoordinates = useSelector(state => state.centerMap);
    const viewRef = useRef(null); // Reference to store the view instance
    const [layers, setLayers] = useState([]); // State for layers

    useEffect(() => {
        const initializeMap = async () => {
            // Create a new WebMap instance
            const webMap = new WebMap({
                portalItem: {
                    id: 'f83463b0f11e402dbbe9472129f732f7' // Replace with your WebMap ID
                }
            });

            // Create a new MapView instance
            const view = new MapView({
                container: mapRef.current,
                center: [mapCenterCoordinates[0], mapCenterCoordinates[1]],
                zoom: mapCenterCoordinates[2],
                map: webMap,
                popupEnabled: true
            });

            // Store the view instance in the ref
            viewRef.current = view;
            let attributesArray = null
            // Handle click event to update sidebar with feature attributes
            view.on("click", function (event) {
                view.hitTest(event).then(function (hitTestResults) {
                    try {
                        view.popup.watch("selectedFeature", async (feature) => {
                            if (feature?.isAggregate) {
                                // Handle cluster
                                const layer = feature.layer;
                                const aggregateId = feature.getObjectId();
                                // Query features in the cluster
                                const layerView = await view.whenLayerView(layer);
                                const query = layerView.createQuery();
                                query.aggregateIds = [aggregateId];
                                query.returnGeometry = true;
                                query.outFields = ["*"]; // Adjust fields as needed

                                const queryResults = await layerView.queryFeatures(query);

                                if (queryResults.features.length > 0) {
                                    const cluster_features = queryResults.features
                                    attributesArray = cluster_features.map(feature => feature.attributes);
                                    console.log(attributesArray);
                                } else {
                                    console.log("No features found for this cluster.");
                                }
                            }
                            store.dispatch(updateClusterFeatures(attributesArray));
                            store.dispatch(updateSidebar(feature?.attributes));
                            console.log(feature)
                        });
                    } catch {
                        store.dispatch(updateSidebar(null));
                    }
                });
            });

            // Wait for webMap to load fully
            await webMap.when();

            // Extract layer information
            const layerInfo = webMap.layers.map(layer => ({
                title: layer.title,
                id: layer.id,
                visible: layer.visible
            }));

            setLayers(layerInfo);
        };

        initializeMap();

        return () => {
            // Cleanup view
            if (viewRef.current) {
                viewRef.current.destroy();
                viewRef.current = null;
            }
        };
    }, [mapCenterCoordinates]);

    // Toggle layer visibility
    const toggleLayerVisibility = (layerId) => {
        setLayers(prevLayers =>
            prevLayers.map(layer =>
                layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
            )
        );

        const view = viewRef.current;
        if (view) {
            const layerToToggle = view.map.findLayerById(layerId);
            if (layerToToggle) {
                layerToToggle.visible = !layerToToggle.visible;
            }
        }
    };

    return (
        <div className="map-container">
            <CustomDropdown
                tag="Layers" // Set a default tag for all layers
                layers={layers}
                onSelectLayer={toggleLayerVisibility}
            />
            <div className="mapbox" ref={mapRef}></div>
        </div>
    );
};

export default MapEsri;
