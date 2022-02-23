import React from "react";
import useAuth from "../hooks/useAuth";

function Home() {
  const { auth } = useAuth();
  return <div>
  {auth.roles[0]}
  </div>;
}

export default Home;
