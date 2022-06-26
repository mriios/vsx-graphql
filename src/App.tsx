import { Route, Routes } from "react-router";

import { useUser } from "./hooks/users/useUser";
import HomePage from "./pages/Home/HomePage";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

const commonRouteProps = {
  strict: true,
  exact: true
};

const App = () => {
  // Using this to get a random user, because we don't have a logged in user to get the data from
  // Could use context to share the user data
  const {
    loading: singleUserLoading,
    data: singleUserData,
    called: singleUserCalled
  } = useUser("cl4oxtzns6w8f4j108g5l92ia");
  let greetingText = "Welcome!",
    currentUser;

  if (!singleUserLoading && singleUserCalled) {
    currentUser = singleUserData.User;
    greetingText = `Hello, ${currentUser.firstName} ${currentUser.lastName}!`;
  }

  return (
    <div className="App">
      <NavBar />
      <h1>Post Analytics Dashboard</h1>
      <div className="App__Content">
        <h2>{greetingText}</h2>
        <Routes>
          <Route {...commonRouteProps} path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
