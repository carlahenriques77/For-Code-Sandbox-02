import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthenticationStatus = () => {
  // Get currentUser state from the Redux store
  const { currentUser } = useSelector((state) => state.authReducer);

  // State to track user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to track loading status
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    // Check if currentUser exists
    if (currentUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Update loading status
    setLoadingStatus(false);
  }, [currentUser]);

  // Return the authentication status and loading status
  return { isAuthenticated, loadingStatus };
};
