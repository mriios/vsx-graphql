import { Route, Routes } from "react-router";

import HomePage from "./pages/Home/HomePage";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

const commonRouteProps = {
  strict: true,
  exact: true
};

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <h1>Post Analytics Dashboard</h1>
      <Routes>
        <Route {...commonRouteProps} path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
