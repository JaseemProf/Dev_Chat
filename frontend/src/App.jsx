import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./pages/Container";
import ChatContainer from "./pages/ChatContainer";

function App() {
  return (
    <>
      <div className="background">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ChatContainer />}/>
              <Route path="login" element={<Container />} />
              <Route path="signup" element={<Container />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
