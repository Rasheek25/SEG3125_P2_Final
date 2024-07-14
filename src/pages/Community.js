import React from 'react'
import '../components/App.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from '../components/postList'


function Home() {

    return (
        <div>
            <Header />
            <PostList />
            <Footer />
      
        </div>
    );

}

export default Home