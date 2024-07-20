import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import React, { useMemo } from 'react';
import '../components/App.css';
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../components/Style.module.css'
import FooterRelative from '../components/FooterRelative';


function Review() {

    const { gameID } = useParams();
    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dataRef = collection(db, "reviews");

    const memoizedData = useMemo(() => async () => {
        try {
          const data = await getDocs(dataRef);
          
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
        })).filter((doc) => doc.gameID == gameID);

        console.log(filteredData);
        console.log(gameID)
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
            <p>Loading game review...</p>
            ) : (
            <>
          <img
            src={`${process.env.PUBLIC_URL}${game.imgLink}`}
            className={style.reviewCover}
            alt="Game"
          />
          <span className={style.rating}>{game.rating}</span>
          <div className='mx-3 my-3 mb-3'>
            <p style={{ fontWeight: 'bold' }}>{game.review[0]}</p>
            <p>{game.review[1]}</p>
            <p>{game.review[2]}</p>
            <p>{game.review[3]}</p>
            <p>{game.review[4]}</p>
          </div>
        </>
      )}
            <FooterRelative />
      
        </div>
    );

}

export default Review