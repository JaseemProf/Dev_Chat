import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function ChatContainer() {
  const APP_ID = import.meta.env.VITE_DEVCHAT_APP_ID;   
  const [data, setData] = useState(null);
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: import.meta.env.VITE_DEVCHAT_URL + "/user",
    }).then((res) => {
      setData(res.data);
    });
  }, []);
  const navigate = useNavigate();
  return data ? (
    <div className="chat-area">
      <SendbirdApp
        // Add the two lines below.
        appId={APP_ID} // Specify your Sendbird application ID.
        userId={data.username} // Specify your user ID.
        theme="dark"
      />
    </div>
  ) : (
    navigate("/login")
  );
}

export default ChatContainer;
