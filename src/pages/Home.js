import React from 'react'
import '../components/App.css';
import Header from '../components/Header'
import GameCardReview from '../components/gameCardReview'
import GameBoard from '../components/gameBoard'
import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {

    return (
        <div>
            <Header />
            <GameBoard />
            <Footer />
      
        </div>
    );

}

export default Home