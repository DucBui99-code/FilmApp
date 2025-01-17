import React from "react";
import Logo from "../../assets/logo-danet.png";
import { Link } from "react-router";

const ListMenu = ["Miễn phí", "Phim Gói", "Truyền Hình"];

function Navigation() {
  return (
    <div className="flex items-center justify-center gap-5">
      <Link to="/">
        <img src={Logo} alt="Logo" className="w-24"></img>
      </Link>
      <div className="flex items-center justify-between gap-6">
        {ListMenu.map((el) => (
          <Link to={`/${el}`} className="hover:text-primary">
            {el}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
