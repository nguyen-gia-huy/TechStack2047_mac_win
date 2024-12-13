import React from "react";

import SearchUser from "./SearchUser/searchUser";
import UserSug from "./userSuggest/userSug";

const ThirdColunms = () => {
  return (
    <div
      className="container-third-colum"
    >
    
      <SearchUser />
      <UserSug/>
    </div>
  );
};

export default ThirdColunms;
