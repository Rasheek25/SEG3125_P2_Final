import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import style from './Style.module.css'
import { useNavigate } from 'react-router-dom';

const SpeedrunCard = ({name, src, gameID}) => {

  const navigate = useNavigate();

  const linkReview = () => {
      navigate(`/Speedruns/${gameID}`)
  };
  


  return (
    <Card onClick={linkReview} className="mb-3 mx-3 my-3 d-inline-block" style={{width: '16rem', cursor:"pointer" }}>
      <Card.Img variant="top" src={process.env.PUBLIC_URL + src} alt="Game" style={{height:200, width: '16rem'}}/>
      
 
      <Card.Body style={{height:125, backgroundColor: '#E9E4DE'}}>
        <Card.Title style={{fontSize: 15, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{name}</Card.Title>

      
        
      </Card.Body>
    </Card>

    
  );
}

export default SpeedrunCard;