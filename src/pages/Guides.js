import React from 'react'
import '../components/App.css';
import Header from '../components/Header'
import GameBoardGuide from '../components/GameBoardGuides'
import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';


function AllGames() {

    return (
        <div>
            <Header />
            
            <GameBoardGuide />

            <Footer />
      
        </div>
    );

}

export default AllGames