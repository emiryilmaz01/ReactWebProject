import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Button } from "antd";
import "./Home.css";

function Home() {
    const navigate = useNavigate();
  return (
    <div className="arkapalan">
      <div className="navbar">
        <div className="menu">
          <Link to="/eşyalarım">
            <Button
            style={{width:'220px', height:'60px',fontSize:'30px', fontFamily:'italic', backgroundColor:'#9072d7'}}
            >Eşyalarım</Button>
          </Link>
          <Link to="/alışveriş">
            <Button style={{width:'220px', height:'60px', fontSize:'30px',fontFamily:'italic', backgroundColor:'#9072d7'}}>Alışveriş</Button>
          </Link>
          <Link to="/profil">
            <Button
             style={{width:'220px', height:'60px',fontFamily:'italic', fontSize:'30px', backgroundColor:'#9072d7'}}
            >Profil</Button>
          </Link>
            <Button
             style={{width:'220px', height:'60px',fontFamily:'italic', fontSize:'30px', backgroundColor:'#9072d7'}}
            onClick={()=>navigate('/sepet')}>Sepet</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
