import style from './Style.module.css';
import {useEffect, useState} from "react";
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import React, { useMemo } from 'react';
import GameCardReview from './gameCardReview';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';



const GameBoardAll = () => {
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
        }));
        console.log(filteredData);
        setGameList(filteredData);

        } catch (error) {
          console.error(error);
        }
      }, []); 

      const sortedGameList = useMemo(() => {
        if (selectedOption === 'Most Popular') {
          return [...gameList].sort((a, b) => b.popularity - a.popularity); 
        } else if (selectedOption === 'Newest') {
          return [...gameList].sort((a, b) => b.releaseDate - a.releaseDate); 
        } else {
          return gameList;
        }
      }, [gameList, selectedOption]);
      

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

      

      const toggle = () => setDropdownOpen(prevState => !prevState);

      const handleSelect = (option) => {
        setSelectedOption(option);
      };


    return (
        <div>
            <div className="mb-3 mx-3 my-3" style={{ display: 'flex' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto', marginRight: 60, marginTop: 30}}>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <Dropdown.Toggle variant='dark' caret style={{width:150}}>
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

            {currentPosts.map((game)=> {
                return <GameCardReview key={game.id} name={game.name} src={game.imgLink} ec={game.ec} rating={game.rating} gameID={game.gameID}/>
            })} 


            <div className="mb-3 mx-3 my-3" style={{display: 'flex', justifyContent: 'center'}}>

              <Button variant='dark' onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</Button>
              <Button variant='dark' onClick={handleNextPage} disabled={lastIndex >= gameList.length}>&gt;</Button>

            </div>

        </div>

       
    )
}

export default GameBoardAll;