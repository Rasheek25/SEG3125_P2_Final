import style from './Style.module.css';

const Footer = () => {
    return (
      <footer className="footer">
        <hr style={{height:10}}/>
        <div className="mb-3 mx-3 my-3" style={{ display: 'flex' }}>
          <span className={style.companyName}>PlayGround</span>

          
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto', marginRight: 20}}>
            <span className={style.companyName}>Copyright © 2024</span>

        </div>
          

        </div>
        
      </footer>
    );
  };
  

  
  export default Footer;