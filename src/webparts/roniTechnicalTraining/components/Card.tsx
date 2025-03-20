import '../../../../assets/dist/tailwind.css';
import * as React from "react";
import CardHeader from './CardHeader';
import CardBody from './CardBody';
interface CardProps {
  onOpenPopup: () => void;
  
  // If you want to pass in props dynamically, you could define them here.
  // For this demo, we'll keep the content hard-coded.
  data: {
    litmosLearningPathName: string;
    pillar: string;
    productName: string;
    litmosLearningPathUrl: string;
    PercentageComplete: number;
    levelName: string;
  };
}

const Card: React.FC<CardProps> = ({ data, onOpenPopup }) => {
  const percentage = Math.max(0, Math.min(100, data.PercentageComplete));
  return (
    <div className="h-[238px] w-[244px] rounded-lg border-2 border-[#41273c] flex flex-col overflow-visible">
        <CardHeader levelName={data.levelName} />
        <CardBody litmosLearningPathName={data.litmosLearningPathName} litmosLearningPathUrl={data.litmosLearningPathUrl} 
        PercentageComplete={percentage} onOpenPopup={onOpenPopup} />
    </div>
  );
};

export default Card;
