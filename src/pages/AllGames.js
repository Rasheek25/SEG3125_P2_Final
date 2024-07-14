import React from 'react'
import '../components/App.css';
import Header from '../components/Header'
import GameCardReview from '../components/gameCardReview'
import GameBoardAll from '../components/GameBoardAll'
import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';
import {useEffect, useState} from "react";


function AllGames() {

    const [selectedFilters, setSelectedFilters] = useState([]);

   

    const handleFilterChange = (event) => {
        const option = event.target.value;
        const isSelected = selectedFilters.includes(option);
    
        setSelectedFilters(isSelected ? selectedFilters.filter((f) => f !== option) : [...selectedFilters, option]);
      };

    return (
        <div>
            <Header />
            
            

            
            <div className="app-container">
                <Sidebar onFilterChange={handleFilterChange} />
                

                <GameBoardAll />
            </div>

            

            <Footer />
      
        </div>
    );

}

export default AllGames