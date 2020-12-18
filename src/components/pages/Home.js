import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ChartJS from "../chart";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <>
          <h1>Welcome {userData.user.displayName}</h1>
          <ChartJS />
        </>
      ) : (
        <>
          <p>Welcome to Personal Expenditure Management App.</p>
          <p>Click Log in to access your monthly expenditure...</p>
          <p>
            <Link to="/login">
              <strong>Log in</strong>
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
