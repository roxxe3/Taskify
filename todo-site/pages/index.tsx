import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  // Authentication check
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/home'); // Redirect to home if authenticated
    } else {
      router.replace('/login'); // Redirect to login if not authenticated
    }
  }, []);

  return null; // No UI needed, we are just redirecting
};

export default IndexPage;
