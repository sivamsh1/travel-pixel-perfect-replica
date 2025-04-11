
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate(-1)} 
      className="text-gray-500 hover:text-primary flex items-center"
      aria-label="Go back"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
};

export default BackButton;
