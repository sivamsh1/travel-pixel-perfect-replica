
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === '/plans') {
      navigate('/contact', { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <button 
      onClick={handleBack}
      className="text-gray-500 hover:text-primary flex items-center"
      aria-label="Go back"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
};

export default BackButton;
