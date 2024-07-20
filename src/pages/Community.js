import React from 'react'
import '../components/App.css';
import Header from '../components/Header'
import FooterRelative from '../components/FooterRelative'
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from '../components/postList'
import '../components/App.css';



function Community() {

    return (
        <div>
            <Header />
            <PostList />
            <FooterRelative />
      
        </div>
    );

}

export default Community