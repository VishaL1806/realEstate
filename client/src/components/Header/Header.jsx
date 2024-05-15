import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModel from "../AddPropertyModel/AddPropertyModel";
import useAuthCheck from "../../hooks/useAuthCheck";

const Header = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const [modalOpened, setModalOpened] = useState(false)

  const {validateLogin} = useAuthCheck()

  const handleAddPropertyClick = ()=>{
      if(validateLogin()){
        setModalOpened(true)
      }
  }

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to={"/"}>
          <img src="/logo.png" alt="logo" width={100} />
        </Link>
        <div className="flexCenter h-menu">
          <Link to={"/properties"}>Properties</Link>
          <Link to={"/bookings"}>My Bookings</Link>
          <Link to={"mailto:vishal.goswami@shivohm.com"}>Contact</Link>
          {modalOpened}
          <div onClick={handleAddPropertyClick} >Add Property </div>
          <AddPropertyModel
          opened={modalOpened}
          setOpened={setModalOpened}
          />
          {!isAuthenticated ? (
            <button className="button" onClick={loginWithRedirect}>
              Login
            </button>
          ) : (
            <ProfileMenu user={user} logout={logout} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
