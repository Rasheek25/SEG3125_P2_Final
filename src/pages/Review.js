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


function Review() {

    const { gameID } = useParams();
    const [game, setGame] = useState([]);

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
            <img src={`${process.env.PUBLIC_URL}${game.imgLink}`} className={style.reviewCover} alt="Game" />
            <span className={style.rating}>{game.Rating}</span>
            <div>{game.summary}</div>
            <hr/>
            <p>{game.review}</p>
            <Footer />
      
        </div>
    );

}

export default Review