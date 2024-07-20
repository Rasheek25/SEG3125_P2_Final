import style from './Style.module.css';
import {useEffect, useState} from "react";
import { db } from '../config/firebase';
import { getDocs, collection, addDoc, FieldValue } from 'firebase/firestore';
import React, { useMemo } from 'react';
import PostCard from './PostCard';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';




const PostList = () => {
    const [postList, setPostList] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[postsPerPage, setPostsPerPage] = useState(4);
    const [newPost, setNewPost] = useState('');
    


    const dataRef = collection(db, "posts");
    const dataReplies = collection(db, "replies");

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

      

     
      

      useEffect(() => {
        memoizedData(); 
      }, [memoizedData]); 

      const sortedPostList = useMemo(() => {
    
        return [...postList].sort((a, b) => b.timestamp - a.timestamp); 
     
      }, [postList]);


      const lastIndex = currentPage * postsPerPage
      const firstIndex = lastIndex - postsPerPage;
      const currentPosts = sortedPostList.slice(firstIndex, lastIndex);

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

      const addPost = async () => {
        if (newPost.trim()) {
          try {
              const PostRef = await addDoc(dataRef, {
                postInfo: newPost,
                timestamp: Date.now()
              });
              console.log("Document written with ID: ", PostRef.id);
              const ReplyRef = await addDoc(dataReplies, {
                postID: PostRef.id,
                replies: []
              });

              memoizedData();
              setNewPost('');
          } catch (error) {
              console.error('Error adding reply: ', error);
          }
      }
      };


    const handleInputChange = (event) => {
      setNewPost(event.target.value);
    };

    

      

     


    return (
        <div>


            <div className="mb-3 mx-3 my-3 d-flex flex-column">



              <div style={{minHeight: window.innerHeight-200, minWidth:window.innerWidth-250}}>
            

                {currentPosts.map((post)=> {
                    return <PostCard key={post.id} name={post.postInfo} postID={post.id}/>
                })} 

              </div>
              <div className="mb-3 mx-3 my-3" style={{display: 'flex', justifyContent: 'center'}}>

            

              <Button variant='dark' onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</Button>
              <Button variant='dark' onClick={handleNextPage} disabled={lastIndex >= postList.length}>&gt;</Button>

              </div>


                <input
                    type="text"
                    value={newPost}
                    onChange={handleInputChange}
                    placeholder="Add Post"
                    className={style.input}
                />
                <Button variant='dark' onClick={addPost}>Add Post</Button>

            </div>

            


            

        </div>

       
    )
}

export default PostList;