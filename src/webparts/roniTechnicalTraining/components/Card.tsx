import '../../../../assets/dist/tailwind.css';
import * as React from "react";
import CardHeader from './CardHeader';
import CardBody from './CardBody';



interface trainingObject {
  litmosLearningPathName: string;
  pillar: string;
  productName: string;
  litmosLearningPathUrl: string;
  PercentageComplete: number;
  levelName: string;
  Id: string;
}


interface CardProps {
  handleTrainingDataClick: (trainingObject: trainingObject) => void;
  
  
  // If you want to pass in props dynamically, you could define them here.
  // For this demo, we'll keep the content hard-coded.
trainingObject: trainingObject;
}




const Card: React.FC<CardProps> = ({ trainingObject, handleTrainingDataClick}) => {
  const percentage = Math.max(0, Math.min(100, trainingObject.PercentageComplete));
  return (
    <div className="h-[238px] w-[244px] rounded-lg border-2 border-[#41273c] flex flex-col overflow-visible">
        <CardHeader levelName={trainingObject.levelName} />
        <CardBody litmosLearningPathName={trainingObject.litmosLearningPathName} litmosLearningPathUrl={trainingObject.litmosLearningPathUrl} 
        PercentageComplete={percentage} handleTrainingDataClick={handleTrainingDataClick} trainigObject={trainingObject}/>
    </div>
  );
};

export default Card;
