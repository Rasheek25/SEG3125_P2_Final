import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import style from './Style.module.css'
import { useNavigate } from 'react-router-dom';

const GameCardReview = ({name, src, ec, rating, gameID}) => {

  const navigate = useNavigate();

  const linkReview = () => {
      navigate(`/Review/${gameID}`)
  };
  


  return (
    <Card onClick={linkReview} className="mb-3 mx-3 my-3 d-inline-block" style={{width: '16rem', cursor:"pointer" }}>
      <Card.Img variant="top" src={process.env.PUBLIC_URL + src} alt="Game" style={{height:200, width: '16rem'}}/>
      
      <span className={style.gameBadge}>{rating}</span>  
      <Card.Body style={{height:125, backgroundColor: '#E9E4DE'}}>
        <Card.Title style={{fontSize: 15, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{name}</Card.Title>

        {ec && <span className={style.editorChoice}>EDITOR'S CHOICE</span>}
        
      </Card.Body>
    </Card>

    
  );
}

export default GameCardReview;