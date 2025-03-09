import * as React from "react";
import ProgressRing from "./Percentage";
import '../../../../assets/dist/tailwind.css';

interface CardBodyProps {
    litmosLearningPathName: string;
    litmosLearningPathUrl: string;
    PercentageComplete: number;
}

const CardBody: React.FC<CardBodyProps> = ({ litmosLearningPathName, litmosLearningPathUrl, PercentageComplete }) => {

    return (
        <div className="h-[117-px] p-4 flex flex-col justify-between h-full relative">
            {/* Main Section: litmos Learning Path Name */}
            <div className="relative group">
                <h2 className="text-md font-semibold text-[#41273c] line-clamp-2">
                    {litmosLearningPathName}
                </h2>
                <div className="absolute bottom-full mb-2 hidden w-auto max-w-xs bg-gray-800 text-white text-sm px-4 py-2 rounded-lg group-hover:block z-50 shadow-lg">
                    {litmosLearningPathName}
                </div>
            </div>

            {/* Footer Section: Learning Path Button & Progress Ring */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between w-full">

                {/* Learning Path Button - Left */}
                <div className="w-[106px] h-[22px] px-2 py-0.5 bg-[#ee0c5d] rounded-xl flex justify-center items-center">
                    <button
                        className="text-white text-xs font-normal"
                        onClick={() => window.open(litmosLearningPathUrl, `_blank`)}
                    >
                        Learning Path
                    </button>
                </div>

                {/* Progress Ring - Right */}
                <div className="w-8 h-8 flex justify-center items-center mr-6">
                    <ProgressRing PercentageComplete={PercentageComplete} />
                </div>
            </div>
        </div>
    );
};
export default CardBody;