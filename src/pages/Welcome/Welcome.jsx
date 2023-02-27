import React, { useEffect } from "react";

export const Welcome = () => {

    const username = localStorage.getItem("username")
    
  
  return (
    <>
      <h1>Welcome Page</h1>
      <p>{username}</p>
    </>
  );
};
