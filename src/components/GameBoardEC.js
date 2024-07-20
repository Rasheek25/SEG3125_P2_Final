import style from './Style.module.css';
import {useEffect, useState} from "react";
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import React, { useMemo } from 'react';
import GameCardReview from './gameCardReview';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Slider from 'react-slider';



const GameBoardAll = ({ selectedFilters }) => {
    const [gameList, setGameList] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[postsPerPage, setPostsPerPage] = useState(8);

    const options = ['Most Popular', 'Newest'];
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const dataRef = collection(db, "games");

    const memoizedData = useMemo(() => async () => {
        try {
          const data = await getDocs(dataRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
        })).filter((doc) => doc.ec === true);
        //console.log(filteredData);
        setGameList(filteredData);

        } catch (error) {
          console.error(error);
        }
      }, []); 

      const filteredGames = gameList.filter(game => {
        // Convert release date to a Date object for comparison
        const releaseDate = new Date(game.releaseDate.seconds * 1000);
        const releaseYear = releaseDate.getFullYear();
       
        const platformMatch = (selectedFilters?.Platforms).length === 0 || (selectedFilters.Platforms).some(platform => game.platforms.includes(platform));
    
         
        const genreMatch = (selectedFilters?.Genres).length === 0 || (selectedFilters.Genres).some(genre => game.genre.includes(genre));
       
        const releaseMatch = selectedFilters.releaseYear && releaseYear >= selectedFilters.releaseYear.start && releaseYear <= selectedFilters.releaseYear.end;
        
        // console.log(game);
        console.log(selectedFilters.releaseYear.start);
        console.log(selectedFilters.releaseYear.end)
        console.log(releaseMatch);
        return platformMatch && genreMatch && releaseMatch;
      });
      //console.log(selectedFilters.Genres);
      //console.log(filteredGames);
      
      

      const sortedGameList = useMemo(() => {
        if (selectedOption === 'Most Popular') {
          return [...filteredGames].sort((a, b) => b.popularity - a.popularity); 
        } else if (selectedOption === 'Newest') {
          return [...filteredGames].sort((a, b) => b.releaseDate - a.releaseDate); 
        } else {
          return filteredGames;
        }
      }, [filteredGames, selectedOption]);
      

      useEffect(() => {
        memoizedData(); 
      }, [memoizedData]); 

      const lastIndex = currentPage * postsPerPage
      const firstIndex = lastIndex - postsPerPage;
      const currentPosts = sortedGameList.slice(firstIndex, lastIndex);

      const handleNextPage = () => {
        if (lastIndex < sortedGameList.length) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

      

      const handleSelect = (option) => {
        setSelectedOption(option);
      };


    return (
        <div>
            <div className="mb-3 mx-3 my-3" style={{ display: 'flex' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto', marginRight: 60, marginTop: 30}}>
                <Dropdown>
                  <Dropdown.Toggle variant='dark' style={{width:150}}>
                    {selectedOption}
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant='dark'>
                    {options.map((option, index) => (
                      <Dropdown.Item key={index} onClick={() => handleSelect(option)}>
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
              </Dropdown>

                

                </div>

            </div>
            
            <div style={{minHeight: window.innerHeight, minWidth:window.innerWidth-250}}>

              {currentPosts.map((game)=> {
                  return <GameCardReview key={game.id} name={game.name} src={game.imgLink} ec={game.ec} rating={game.rating} gameID={game.gameID}/>
              })} 


            </div>


            <div className="mb-3 mx-3 my-3" style={{display: 'flex', justifyContent: 'center'}}>

              <Button variant='dark' onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</Button>
              <Button variant='dark' onClick={handleNextPage} disabled={lastIndex >= gameList.length}>&gt;</Button>

            </div>

        </div>

       
    )
}

export default GameBoardAll;