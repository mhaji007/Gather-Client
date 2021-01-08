import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
