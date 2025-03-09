import '../../../../assets/dist/tailwind.css';
import * as React from "react";
interface PercentageProps {
  // If you want to pass in props dynamically, you could define them here.
  // For this demo, we'll keep the content hard-coded.
 
    PercentageComplete: number;
 
}

const Percentage: React.FC<PercentageProps> = ({ PercentageComplete }) => {

  {/* <div class="text-center"><span class="text-[#41273c] text-[10px] font-bold font-['Inter']">23</span><span class="text-[#41273c] text-[9px] font-bold font-['Inter']">%</span></div> */}
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            {/* Background Circle */}
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200" strokeWidth="2"></circle>
            {/* Foreground Circle */}
            <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-[#41273c]"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={100 - PercentageComplete}
                strokeLinecap="round"
            ></circle>
        </svg>
        {/* Progress Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-[#41273c]">
            {PercentageComplete}%
        </div>
    </div>
);
};

export default Percentage;