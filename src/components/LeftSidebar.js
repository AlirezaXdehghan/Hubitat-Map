import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import './LeftSideBar.css';

const LeftSidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarData = useSelector(state => state.sidebarData);
    const clusterFeatures = useSelector(state => state.clusterFeatures); // Access cluster features

    useEffect(() => {
        if (sidebarData != null) {
            setShowSidebar(true);
        } else {
            setShowSidebar(false);
        }
    }, [sidebarData]);

    const excludedKeys = [
        "aggregateId",
        "cluster_count",
        "cluster_type_Organization_Type",
        "__OBJECTID",
        "Latitude",
        "Longitude",
    ];

    const handleDownloadClustersCSV = () => {
        const convertToCSV = (data) => {
            const array = Array.isArray(data) ? data : [data];
            const headers = Object.keys(array[0]).join(",");
            const rows = array.map(obj => {
                return Object.values(obj).map(value => {
                    if (typeof value === "string" && value.includes(',')) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                }).join(",");
            });
            return [headers, ...rows].join("\n");
        };

        const csvData = convertToCSV(clusterFeatures);
        const blob = new Blob([csvData], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "clusterFeatures.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadClustersJSON = () => {
        const jsonData = JSON.stringify(clusterFeatures, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "clusterFeatures.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <CSSTransition
                in={showSidebar}
                timeout={200}
                classNames="sidebar"
                unmountOnExit
            >
                <div className="one-fourth attributes">
                    <h3>Point's Attributes</h3>
                    {sidebarData && (
                        <>
                            <ul>
                                {sidebarData.cluster_count > 1 ? (
                                    <li>
                                        <strong>Cluster Count:</strong> {sidebarData.cluster_count}
                                    </li>
                                ) : (
                                    Object.entries(sidebarData)
                                        .filter(([key]) => !excludedKeys.includes(key)) // Filter out excluded keys
                                        .map(([key, value], index) => (
                                            <li key={index}>
                                                <strong>{key.replace(/_/g, ' ')}:</strong> {/* Replace underscores with spaces */}
                                                {value || 'N/A'}
                                            </li>
                                        ))
                                )}
                            </ul>
                            {sidebarData.cluster_count > 1 && (
                                <>
                                    <button
                                        onClick={handleDownloadClustersJSON}
                                        className="download-button"
                                    >
                                        Download Data as JSON
                                    </button>
                                    <button
                                        onClick={handleDownloadClustersCSV}
                                        className="download-button"
                                    >
                                        Download Data as CSV
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </CSSTransition>
        </>
    );
};

export default LeftSidebar;
