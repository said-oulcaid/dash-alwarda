import React from "react";
import { NavLink } from "react-router-dom";

const LinkPages = ({ className, text, id,to,icon }) => {
  return (
    <NavLink className={className} id={id} to={to}>
    {icon&&icon}  {text}
    </NavLink>
  );
};

export default LinkPages
