import React from 'react'
import '../components/App.css';
import Header from '../components/Header'
import SpeedrunBoard from '../components/SpeedrunBoard'
import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';
import {useEffect, useState} from "react";


function Speedruns() {

   

    return (
        <div>
            <Header />
            
            <SpeedrunBoard />
        

            

            <Footer />
      
        </div>
    );

}

export default Speedruns