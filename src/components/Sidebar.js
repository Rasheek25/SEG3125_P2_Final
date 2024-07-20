import Slider from 'react-slider';
import {useEffect, useState} from "react";
import './App.css'

function Sidebar({ onFilterChange, onYearRangeChange }) {

    const filtersData = {
        "Release Year": [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017],
        "Platforms": ["PS5", "PS4", "Xbox Series X/S", "Nintendo Switch", "PC"],
        "Genres": ["Action", "Adventure", "Arcade", "Beat-'Em'Up", "Board / Card Game", "Fighting", "Platformer", "Puzzle", "RPG", "Racing", "Rougelike", "Shooter", "Strategy"] 
      };

      const [selectedYearRange, setSelectedYearRange] = useState([
        Math.min(...filtersData['Release Year']),
        Math.max(...filtersData['Release Year']),
      ]);

      const handleReleaseYearChange = (val) => {
         setSelectedYearRange(val);
         onYearRangeChange(val);
        
        
      };

      

    return (
                <div className="sidebar mx-3 my-3" style={{width:225}}>
            <h2>Filters</h2>
            {Object.entries(filtersData).map(([category, options]) => (
            <div key={category}>
            {category === 'Release Year' && (
                <div key={category}>
                    <h3>{category}</h3>
                    <Slider
                    thumbClassName="example-thumb"
                    className="releaseYearSlider"
                    defaultValue={[Math.min(...filtersData[category]), Math.max(...filtersData[category])]} //2017-2024
                    min={Math.min(...filtersData['Release Year'])}  //2017 is the min value
                    max={Math.max(...filtersData['Release Year'])}  //2024 is the max value
                    onAfterChange={(val) => handleReleaseYearChange(val)}  
                    valueLabelDisplay="auto"
                    />
                    <span className="release-year-range">{`${Math.min(...selectedYearRange)} - ${Math.max(...selectedYearRange)}`}</span>
                    <hr />
                </div>
            )}

            {category !== 'Release Year' && (
                <div key={category}>
                    <h3>{category}</h3>
                <ul className="list-unstyled">
                    {options.map((option) => (
                    <li key={option}>
                        <input type="checkbox" id={`${category}-${option}`} value={option} onChange={onFilterChange} />
                        <label htmlFor={`${category}-${option}`}>{option}</label>
                    </li>
                    ))}
                    {category !== "Genres" && <hr />}
                </ul>
                </div>
            )}
          
        </div>

            
      ))}
    </div>
  );
};

export default Sidebar;
