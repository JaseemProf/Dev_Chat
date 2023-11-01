import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    verifyPassword: "",
  });
  
  const [statusCode,setStatusCode] = useState(0);
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function register(e) {
    e.preventDefault();
    Axios({
      method: "POST",
      data: formData,
      withCredentials: true,
      url: import.meta.env.VITE_DEVCHAT_URL + "/register",
    })
      .then((res) => setStatusCode(res.status))
      .catch((error) => {
        setStatusCode(error.response.status); 
      });
  }
  if (statusCode === 200) {
    navigate("/login")
  }

  return (
    <div className="signup-area">
      <div className="signup">
        <form className="signup-form" onSubmit={register}>
          <h1>
            <strong>SignUp</strong>
          </h1>
          <div className="field field_v2 input">
            <label htmlFor="name" className="ha-screen-reader">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="field__input"
              placeholder="e.g. Jaseem"
              name="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              required={true}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Name</span>
            </span>
          </div>
          <div  className={statusCode === 400 ?  "field field_v2 last-input" : "field field_v2 input" }>
            <label htmlFor="user-name" className="ha-screen-reader">
              Username
            </label>
            <input
              type="text"
              id="user-name"
              className="field__input"
              placeholder="e.g. DevMonkey"
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
          {statusCode === 400 && <span className="password-error">This username is already taken</span>}

          <div className="field field_v2 input">
            <label htmlFor="password" className="ha-screen-reader">
              Password
            </label>
            <input
              type="password"
              id="password"
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

          <div className="field field_v2 last-input">
            <label htmlFor="verify-password" className="ha-screen-reader">
              Verify Password
            </label>
            <input
              type="password"
              id="verify-password"
              className="field__input"
              placeholder="retype the password"
              name="verifyPassword"
              autoComplete="off"
              value={formData.verifyPassword}
              onChange={handleChange}
              required={true}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Verify Password</span>
            </span>
          </div>
          {formData.password !== formData.verifyPassword && (
            <span className="password-error">Password is not same</span>
          )}

          <div className="btn-container">
            <button
              className={formData.password !== formData.verifyPassword ? "glow-on-hover btn invalid-btn" : "glow-on-hover btn"}
              type="submit"
             disabled={formData.password !== formData.verifyPassword ? true : false}
            >
              Go
            </button>
            <p>
              or <Link to="/">Already have account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
