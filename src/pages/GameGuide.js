import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import React, { useMemo } from 'react';
import '../components/App.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../components/Style.module.css'


function GameGuide() {

    const { walkthroughID } = useParams();
    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dataRef = collection(db, "guides");

    const memoizedData = useMemo(() => async () => {
        try {
          const data = await getDocs(dataRef);
          
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
        })).filter((doc) => doc.walkthroughID == walkthroughID);

        console.log(filteredData);
        console.log(walkthroughID);
        setGame(filteredData[0]);
        setIsLoading(false);

        } catch (error) {
          console.error(error);
        }
      }, []); 
      

      useEffect(() => {
        memoizedData(); 
      }, [memoizedData]); 

      

    return (
        <div>
            <Header />
            {isLoading ? ( 
            <p>Loading game guide...</p>
            ) : (
            <>
          <img
            src={`${process.env.PUBLIC_URL}${game.imgLink}`}
            className={style.reviewCover}
            alt="Game"
          />
          <span className={style.type}>{game.type}</span>
          <p style={{ fontWeight: 'bold' }}>{game.guide[0]}</p>
          <p>{game.guide[1]}</p>
          <p>{game.guide[2]}</p>
          <p>{game.guide[3]}</p>
          <p>{game.guide[4]}</p>
        </>
      )}
         
            <Footer />
      
        </div>
    );

}

export default GameGuide