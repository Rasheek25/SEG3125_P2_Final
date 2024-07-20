import React from 'react';
import style from './Style.module.css';
import { useNavigate } from 'react-router-dom';

const FooterRelative = () => {
    // Calculate the height needed for the footer to stay at the bottom
    const footerStyle = {
        position: 'relative',
        width: '100%',
        padding: '10px 0'
    };

    const navigate = useNavigate();

    const linkAbout = () => {
        navigate(`/About`)
    };

    return (
        <footer style={footerStyle}>
            <hr/>
            <div className="mb-3 mx-3 my-3" style={{ display: 'flex' }}>
                <span className={style.companyName}>PlayGround</span>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto', marginRight: 20 }}>
                    <span className={style.companyName}>Copyright © 2024</span>
                </div>
            </div>
            <div className="mb-3 mx-3 my-3" style={{ display: 'flex' }}>
            <span className={style.about} onClick={linkAbout}>About Us</span>
            </div>
        </footer>
    );
};

export default FooterRelative;