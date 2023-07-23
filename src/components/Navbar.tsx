import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCourseContext } from "../context/context";

function Navbar() {
  const final = useCourseContext();
  const check = async () => {
    const response = await fetch(`http://localhost:3000/admin/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
    
    final?.setUserEmail(data.username);
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div className="nav-bar">
      <span className="logo">
      EduLab
      </span>
      {final?.userEmail && final.userEmail.length > 1 ? (
        <>
          <Link to={`/`}>Home</Link>
          <Link to={`/instructor`}>Instructor</Link>
       
          {/* <button>Cart{" (0) "}</button> */}
          <button className="logout-btn"
            onClick={() => {
              localStorage.setItem("token", "");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <div className="sign-in-row">
      <span className="business-logo">
        <Link to={`/edulab-business`}>
          Edulab Business
          </Link>
      </span>
          <input type="search" placeholder="Tap Here to Search" className="search-bar" />
          <Link to={`/signup`}>SignUp</Link>
          <Link to={`/signin`}>SignIn</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
