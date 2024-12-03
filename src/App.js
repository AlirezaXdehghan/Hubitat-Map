import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import RightSideBar from './components/RightSideBar';
import LeftSidebar from './components/LeftSidebar';
import Nav from "./components/Nav";
import Footer from './components/Footer';
import './App.css';
import MapEsri from "./components/MapEsri";
import SearchBar from "./components/SearchBar";
import {useSelector} from "react-redux";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCriteria, setFilterCriteria] = useState([]);
    const [filteredEffects, setFilteredEffects] = useState([]);
    useEffect(() => {
        filterEffects();
    }, [searchTerm, filterCriteria]);

    const filterEffects = () => {
        let filtered = ['some','data']//churchData
            .map(church => ({
                fullName: church,
                // fullName: church.content["Full Name"],
                // lat: church.lat,
                // lng: church.lng,
                // denomination: church.content["Denomination"]?.toLowerCase() || "",
                // island: church.content["Island"]?.toLowerCase() || "",
            }))
            .filter(({fullName, denomination, island}) => fullName.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filterCriteria.length > 0) {
            filtered = filtered.filter(({
                                            denomination,
                                            island
                                        }) => filterCriteria.every(criterion => denomination.includes(criterion.toLowerCase()) || island.includes(criterion.toLowerCase())));
        }

        setFilteredEffects(filtered.map(item => item));
    };

    const handleCheckboxChange = (characteristic) => {
        setFilterCriteria(prevState => prevState.includes(characteristic) ? prevState.filter(item => item !== characteristic) : [...prevState, characteristic]);
    };

    return (<div className="App">
            <div className="content">
                <div className="Header">
                    <Header/>
                </div>
                <div className="NavBar">
                    <div className="Nav">
                        <Nav/>
                    </div>
                </div>

                <div className="main-content">
                    <LeftSidebar/>
                    <div className="two-fourth">
                        <div>
                            <MapEsri/>
                        </div>
                    </div>
                </div>
                <div className="Footer">
                    <Footer/>
                </div>
            </div>
        </div>);
}

export default App;
