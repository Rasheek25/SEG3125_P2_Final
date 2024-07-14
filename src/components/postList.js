import style from './Style.module.css';
import {useEffect, useState} from "react";
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import React, { useMemo } from 'react';
import PostCard from './PostCard';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';



const PostList = () => {
    const [postList, setPostList] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[postsPerPage, setPostsPerPage] = useState(4);


    const dataRef = collection(db, "posts");

    const memoizedData = useMemo(() => async () => {
        try {
          const data = await getDocs(dataRef);
          
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
        }))

        console.log(filteredData);
        setPostList(filteredData);

        } catch (error) {
          console.error(error);
        }
      }, []); 

      postList.sort((a, b) => b.releaseDate - a.releaseDate );
      

      useEffect(() => {
        memoizedData(); // Call the callback function to fetch data
      }, [memoizedData]); // Dependency on memoizedData to trigger fetch only on change

      const lastIndex = currentPage * postsPerPage
      const firstIndex = lastIndex - postsPerPage;
      const currentPosts = postList.slice(firstIndex, lastIndex);

      const handleNextPage = () => {
        if (lastIndex < postList.length) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

      

     


    return (
        <div>
            

            {currentPosts.map((post)=> {
                return <PostCard key={post.id} name={post.postInfo} postID={post.postID}/>
            })} 


            <div className="mb-3 mx-3 my-3" style={{display: 'flex', justifyContent: 'center'}}>

              <Button variant='dark' onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</Button>
              <Button variant='dark' onClick={handleNextPage} disabled={lastIndex >= postList.length}>&gt;</Button>

            </div>

        </div>

       
    )
}

export default PostList;