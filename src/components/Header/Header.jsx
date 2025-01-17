import React from "react";
import Navigation from "./Navigation";
import ActionBar from "./ActionBar";

function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-black text-white font-medium">
      <Navigation></Navigation>
      <ActionBar></ActionBar>
    </div>
  );
}

export default Header;
