import React, { useEffect, useState } from "react";
import "./Navbar.scss";
// import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [menu, setMenu] = useState(false)

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
    <div className={`${active && "active"} navbar`}>
      <div className="container">
        <div className="logo">
          {/* <Link to="/"> */}
          <span className="text">Fiverr</span>
          {/* </Link> */}
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
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="user-img" />
              <span onClick={() => setMenu(!menu)}>{currentUser.username}</span>
              {menu &&
                <div className="options">
                {!currentUser.isSeller && (
                  <>
                    <span>Gigs</span>
                    <span>Add new Gigs</span>
                  </>
                )}
                <span>Order</span>
                <span>Logout</span>
              </div>}
            </div>
          )}
        </div>
      </div>
      {active && (
        <>
          <hr />
          <div className="menu">
            <span>test 1</span>
            <span>test 1</span>
            <span>test 1</span>
            <span>test 1</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
