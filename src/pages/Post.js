import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import React, { useMemo } from 'react';
import '../components/App.css';
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../components/Style.module.css'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import Button from 'react-bootstrap/esm/Button';
import FooterRelative from '../components/FooterRelative';



function Post() {

    const { postID } = useParams();
    const [post, setPost] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState('');

    const dataRef = collection(db, "posts");
    const dataReplies = collection(db, "replies");

    const memoizedData = useMemo(() => async () => {
        try {
          const data = await getDocs(dataRef);
          const dataRep = await getDocs(dataReplies);
          
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
        })).filter((doc) => doc.id == postID);

        const filteredDataRep = dataRep.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
        })).filter((doc) => doc.postID == postID);

        console.log(filteredData);
        console.log(filteredDataRep);
        console.log(postID)
        setPost(filteredData[0]);
        setCommentList(filteredDataRep[0]);

        } catch (error) {
          console.error(error);
        }
      }, []); 
      

      useEffect(() => {
        memoizedData(); 
      }, [memoizedData]); 

      useEffect(() => {
        if (commentList && commentList.replies) {
            console.log("Replies: ", commentList.replies);
            setReplies(commentList.replies);
           
        }
    }, [commentList]);

    const addReply = async () => {
        if (newReply.trim()) {
            try {
                const ReplyRef = doc(db, 'replies', commentList.id);
                await updateDoc(ReplyRef, {
                    replies: arrayUnion(newReply)
                });
                setReplies([...replies, newReply]);
                setNewReply('');
            } catch (error) {
                console.error('Error adding reply: ', error);
            }
        }
    };

    
    const handleInputChange = (event) => {
        setNewReply(event.target.value);
    };

      

    return (
        <div>
            <Header />
            <h2 className="mb-3 mx-3 my-3 d-flex flex-column">{post.postInfo}</h2>

            <hr/>
            <div className="mb-3 mx-3 my-3 d-flex flex-column">

                <div style={{minHeight: window.innerHeight-400, minWidth:window.innerWidth-250}}>
            
                    {replies.map((reply, index) => (
                        <div key={index} style={{marginTop:'30px'}}>
                            <span className={style.reply}>{reply}</span>
                        </div>    


                    ))}

                </div>

                <input
                    type="text"
                    value={newReply}
                    onChange={handleInputChange}
                    placeholder="Add reply"
                    className={style.input}
                />
                <Button variant='dark' onClick={addReply}>Add Reply</Button>


            </div>

            
            <FooterRelative />
      
        </div>
    );

}

export default Post