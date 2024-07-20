import React from 'react'
import './App.css';
import Header from './Header'
import GameCardReview from './gameCardReview'
import GameBoard from './gameBoard'
import Footer from './Footer'

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home'
import AllGames from '../pages/AllGames'
import Review from '../pages/Review'
import EditorGames from '../pages/EditorGames'
import Community from '../pages/Community'
import Guides from '../pages/Guides'
import GameGuide from '../pages/GameGuide'
import Speedruns from '../pages/Speedruns'
import SpeedrunGame from '../pages/SpeedrunGame'
import Post from '../pages/Post'
import About from '../pages/About'


<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home />} />
          <Route path="/home" element = {<Home />} />
          <Route path="/AllGames" element = {<AllGames />} />
          <Route path="/EditorGames" element = {<EditorGames />} />
          <Route path="/Guides" element = {<Guides />} />
          <Route path="/Speedruns" element = {<Speedruns />} />
          <Route path="/Community" element = {<Community />} />
          <Route path="/Review/:gameID" element = {<Review />} />
          <Route path="/GameGuide/:walkthroughID" element = {<GameGuide />} />
          <Route path="/Speedruns/:gameID" element = {<SpeedrunGame />} />
          <Route path="/Post/:postID" element = {<Post />} />
          <Route path="/About" element = {<About />} />
        </Routes>
      
      </BrowserRouter>
      
    </div>
    
    

    
  );
}

export default App;
