import { NavLink } from "react-router";
import websiteLogo from "../assets/website_logo.png";
import SearchBar from "./SearchBar";
import ShoppingCart from "./ShoppingCart";
import UserInfo from "./UserInfo";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white flex items-center justify-between px-4 py-2 shadow-md">
      <div className="flex-shrink-0">
        <NavLink to="/product">
          <img src={websiteLogo} alt="Website logo" className="w-15 h-15" />
        </NavLink>
      </div>
      <SearchBar />
      <div className="flex items-center gap-4">
        <UserInfo />
        <ShoppingCart />
      </div>
    </div>
  );
};

export default NavBar;
