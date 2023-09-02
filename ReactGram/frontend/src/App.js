import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Registers&Login/Login";
import Register from "./Pages/Registers&Login/Register";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { useAuthenticationStatus } from "./hooks/useAuth";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Profile from "./Pages/Profile/Profile";
import Photo from "./Pages/Photo/Photo";
import Search from "./Pages/Search/Search";

function App() {
  const { isAuthenticated, loadingStatus } = useAuthenticationStatus();

  if (loadingStatus) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Routes for the Authenticated User */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={
              isAuthenticated ? <EditProfile /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/users/:pathgetUserByID"
            element={
              isAuthenticated ? <Profile /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/search"
            element={
              isAuthenticated ? <Search /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/photos/:pathFindPhotoID"
            element={
              isAuthenticated ? <Photo /> : <Navigate to="/login" />
            }
          />

          {/* Routes if the User isn't Authenticated */}
          <Route
            path="/register"
            element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
