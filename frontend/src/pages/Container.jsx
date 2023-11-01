import { TypeAnimation } from "react-type-animation";
import { useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import PropTypes from "prop-types";

function Container({ children }) {
  const location = useLocation();
  const { pathname } = location;

  let newChildren = children;

  if (pathname === "/login") {
    newChildren = <LoginPage />;
  } else if (pathname === "/signup") {
    newChildren = <SignUp />;
  }
  return (
    <div className="container">
      <div className="content">
        <div className="content-box">
          <h1>DevChat</h1>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              " It's a vibrant community where developers can connect.",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              " It's a vibrant community where developers can collaborate.",
              1000,
              " It's a vibrant community where developers can grow together.",
              1000,
            ]}
            wrapper="p"
            speed={50}
            style={{ fontSize: "1.7rem" }}
            repeat={Infinity}
          />
          <p className="description">
            DevChat is the ultimate communication platform tailored specifically
            for developers, designed to streamline collaboration, knowledge
            sharing, and networking within the developer community. Whether
            you&apos;re a seasoned pro or just starting your coding journey, DevChat
            is your go-to app for all things development-related.
          </p>
        </div>
      </div>
      {newChildren}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
