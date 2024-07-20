import React from 'react'
import '../components/App.css';
import Header from '../components/Header'
import GameCardReview from '../components/gameCardReview'
import GameBoardAll from '../components/GameBoardAll'
import FooterRelative from '../components/FooterRelative'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';
import {useEffect, useState} from "react";
import style from '../components/Style.module.css';


function AllGames() {

    const [selectedFilters, setSelectedFilters] = useState({
        Platforms: [],
        Genres: [],
        releaseYear: {
            start: 2017,
            end: 2024
        }
      });
    
      

   

    const handleFilterChange = (event) => {
        const { id, checked } = event.target;
        const [category, value] = id.split('-');

        setSelectedFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
          if (category === 'releaseYear') {
            newFilters.releaseYear = value;
          } else {
            if (!Array.isArray(newFilters[category])) {
              newFilters[category] = [];
            }
            newFilters[category] = checked
              ? [...newFilters[category], value]
              : newFilters[category].filter((v) => v !== value);
          }
        //console.log(newFilters);
        return newFilters;
        });

        
      };

      const handleYearRangeChange = (yearRange) => {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          releaseYear: {
            start: yearRange[0],
            end: yearRange[1]
          }
        }));
      };

      //console.log(selectedFilters.releaseYear);

     
      

    return (
        <div>
            <Header />
            
            

            
            <div className="app-container">
                <Sidebar onFilterChange={handleFilterChange} onYearRangeChange={handleYearRangeChange} />
                

                <GameBoardAll selectedFilters={selectedFilters}/>


                
            </div>

            

            <FooterRelative />
      
        </div>
    );

}

export default AllGames