import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "../../utils/axios";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [menu, setMenu] = useState(false);
  const {pathname} = useLocation(); //looking out for the url location

const handleLogout  = async () => {
  try {
    const res = await axios.post("/auth/logout")
    localStorage.clear("user")
    console.log(res);
  } catch (error) {
    console.log(error)
  }
}
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user"))

  return (
    <div className={`${(active || pathname !=="/") && "active"} navbar`}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && <span>Sign in</span>}
          {currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user">
              <img
                src={currentUser.img || "/img/noavatar.jpg"}
                alt="user-img"
              />
              <span onClick={() => setMenu(!menu)}>{currentUser.username}</span>
              {menu && (
                <div className="options">
                  {!currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">Gigs</Link>
                      <Link className="link" to="/add">Add new Gigs</Link>
                    </>
                  )}
                  <Link className="link" to="/orders">Order</Link>
                  <Link className="link" onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !=="/") && (
        <>
          <hr />
          <div className="menu">
           <Link to="/" className="link">Graphics & Designs</Link>
           <Link to="/" className="link">Videos & Animations</Link>
           <Link to="/" className="link">Writing & Translation</Link>
           <Link to="/" className="link">AI Services</Link>
           <Link to="/" className="link">Digital Marketing</Link>
           <Link to="/" className="link">Music & Audio</Link>
           <Link to="/" className="link">Programming and Tech</Link>
           <Link to="/" className="link">Bussiness</Link>
           <Link to="/" className="link">Lifestyle</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
