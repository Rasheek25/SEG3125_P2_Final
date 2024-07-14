import style from './Style.module.css';
import {useEffect, useState} from "react";
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import React, { useMemo } from 'react';
import SpeedrunCard from './SpeedrunCard';
import Button from 'react-bootstrap/Button';



const SpeedrunBoard = () => {
    const [gameList, setGameList] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[postsPerPage, setPostsPerPage] = useState(5);
    

    const dataRef = collection(db, "speedrun");

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
      

      useEffect(() => {
        memoizedData(); 
      }, [memoizedData]); 

      gameList.sort((a, b) => b.releaseDate - a.releaseDate );

      const lastIndex = currentPage * postsPerPage
      const firstIndex = lastIndex - postsPerPage;
      const currentPosts = gameList.slice(firstIndex, lastIndex);

      const handleNextPage = () => {
        if (lastIndex < gameList.length) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };


    return (
        <div>
            <div className="mb-3 mx-3 my-3" style={{ display: 'flex' }}>
                <h2 className={style.title}>Speedruns</h2>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto', marginRight: 20}}>

                <Button variant='dark' onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</Button>
                <Button variant='dark' onClick={handleNextPage} disabled={lastIndex >= gameList.length}>&gt;</Button>

                </div>

            </div>

            {currentPosts.map((game)=> {
                return <SpeedrunCard key={game.id} name={game.name} src={game.imgLink} gameID={game.gameID}/>
            })}

        </div>

       
    )
}

export default SpeedrunBoard;