import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import style from './Style.module.css'
import { useNavigate } from 'react-router-dom';

const PostCard = ({name, postID}) => {

  const navigate = useNavigate();

  const linkReview = () => {
      navigate(`/Post/${postID}`)
  };
  


  return (
    <Card onClick={linkReview} className="mb-3 mx-3 my-3 d-inline-block" style={{width: '88rem', cursor:"pointer" }}>
     
      <Card.Body style={{height:100, backgroundColor: '#E9E4DE'}}>
        <Card.Title style={{fontSize: 15, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{name}</Card.Title>
        
      </Card.Body>
    </Card>

    
  );
}

export default PostCard;