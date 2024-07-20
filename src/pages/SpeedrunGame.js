import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import React, { useMemo } from 'react';
import '../components/App.css';
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../components/Style.module.css'
import useCountdown from '../components/useCountdown';
import Button from 'react-bootstrap/esm/Button';
import FooterRelative from '../components/FooterRelative';





function SpeedrunGame() {

    

    const { gameID } = useParams();
    const [game, setGame] = useState([]);
    const { time, start, stop, reset } = useCountdown(0);
    const [laps, setLaps] = useState([]);
    const [lapTimes, setLapTimes] = useState([]);

    const dataRef = collection(db, "speedrun");

    const memoizedData = useMemo(() => async () => {
        try {
          const data = await getDocs(dataRef);
          
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
        })).filter((doc) => doc.gameID == gameID);

        
        setGame(filteredData[0]);

        } catch (error) {
          console.error(error);
        }
      }, []); 

      
      

      useEffect(() => {
        memoizedData(); 
      }, [memoizedData]); 

      useEffect(() => {
        if (game && game.laps) {
            console.log("Game laps: ", game.laps);
            setLaps(game.laps);
           
        }
    }, [game]);



      const formatTime = (time) => {
        const getMilliseconds = `00${time % 1000}`.slice(-3);
        const seconds = Math.floor(time / 1000);
        const getSeconds = `0${seconds % 60}`.slice(-2);
        const minutes = Math.floor(seconds / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
    };

    const recordLap = () => {
        setLapTimes(prevLapTimes => {
            const lastLapTime = prevLapTimes.length > 0 ? prevLapTimes[prevLapTimes.length - 1] : 0;
            return [...prevLapTimes, time - lastLapTime];
        });
    };

      

    return (
        <div>
            <Header />
            
            
                {game && (
                    <>
                        <img src={`${process.env.PUBLIC_URL}${game.imgLink}`} className={style.reviewCover} alt="Game" />
                        <div className="mb-3 mx-3 my-3 d-flex flex-column align-items-center">
                        <div className={style.timer}>
                            {formatTime(time)}
                        </div>
                        <div className="mt-3">
                            <Button variant='dark' onClick={start}>Start</Button>
                            <Button variant='dark' onClick={stop}>Stop</Button>
                            <Button variant='dark' onClick={reset}>Reset</Button>
                            <Button variant='dark' onClick={recordLap}>Lap</Button>
                        </div>
                        </div>
                        <div>
                            <div className="laps mt-3">
                                <h3 style={{textAlign: 'center'}}>Laps:</h3>
                                
                                {lapTimes.map((lapTime, index) => (
                                    <div key={index} className='mb-3 mx-3 my-3'>
                                        <span>{laps[index]}:</span>
                                        <span>{formatTime(lapTime)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

          

  
            

            <FooterRelative />
      
        </div>
    );

}



export default SpeedrunGame