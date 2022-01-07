import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // fix for memory leak for unmounted component warning
  const isMountedRef = useRef(true);

  useEffect(() => {
    if (isMountedRef) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      })
    }

    return () => {
      isMountedRef.current = false;
    }
  }, [isMountedRef])

  return { isLoggedIn, isLoading };
}
