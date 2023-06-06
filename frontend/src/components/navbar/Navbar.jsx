import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [menu, setMenu] = useState(false);
  const {pathname} = useLocation(); //looking out for the url location

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = {
    id: 1,
    isSeller: false,
    username: "John",
  };
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
          {currentUser.isSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
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
                  <Link className="link" to="/">Logout</Link>
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
