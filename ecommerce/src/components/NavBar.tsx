import { NavLink } from "react-router";
import websiteLogo from "../assets/website_logo.png";
import { CartProduct } from "../types";
import SearchBar from "./SearchBar";
import ShoppingCart from "./ShoppingCart";
import UserInfo from "./UserInfo";

interface NavBarProps {
  cart: CartProduct[];
  onDelete: (productId: number) => void;
}

const NavBar = ({ cart, onDelete }: NavBarProps) => {
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
        <ShoppingCart cart={cart} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default NavBar;
