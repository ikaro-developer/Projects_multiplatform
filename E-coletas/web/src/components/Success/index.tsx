import { FiCheck } from "react-icons/fi";
import "./styles.css";

interface SuccessProps {
  visible: boolean;
  onClose: () => void;
}

const Success = ({ visible, onClose }: SuccessProps) => {
  if (!visible) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container">
        <div className="popup-icon">
          <FiCheck size={48} />
        </div>
        <p className="popup-text">Cadastro concluído!</p>
      </div>
    </div>
  );
};

export default Success;
