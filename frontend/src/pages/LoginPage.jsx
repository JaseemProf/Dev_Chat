import Axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function login(e) {
    e.preventDefault();
    Axios({
      method: "POST",
      data: formData,
      withCredentials: true,
      url: import.meta.env.VITE_DEVCHAT_URL + "/login",
    }).then((res) => {
      console.log(res);
      if (res.status === 200){
        navigate("/")
      }
    });
  }

  return (
    <div className="login-area">
      <div className="login">
        <form className="login-form" onSubmit={login}>
          <h1>
            <strong>Login</strong>
          </h1>
          <div className="field field_v2 input">
            <label htmlFor="user-name" className="ha-screen-reader">
              Username
            </label>
            <input
              type="text"
              id="user-name"
              className="field__input"
              placeholder="e.g. Jaseem028"
              name="username"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange}
              required={true}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Username</span>
            </span>
          </div>
          <div className="field field_v2 input">
            <label htmlFor="user-name" className="ha-screen-reader">
              Password
            </label>
            <input
              type="password"
              id="user-name"
              className="field__input"
              placeholder="must contain 8 or more characters"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              required={true}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Password</span>
            </span>
          </div>
          <div className="btn-container">
            <button className="glow-on-hover btn" type="submit">
              Go
            </button>
            <p>
              or <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
