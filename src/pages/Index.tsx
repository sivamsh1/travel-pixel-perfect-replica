
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the first step of the form
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
