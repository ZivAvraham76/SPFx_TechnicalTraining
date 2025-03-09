import * as React from "react";


interface CardHeaderProps {
    levelName: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ levelName }) => {
    return (
        <div className="relative w-full h-[121px] flex-shrink-0 overflow-hidden">
            {/* Course Image */}
            <img className="w-full h-full object-cover" src="https://picsum.photos/160" alt="Course" />

            {/* Level Badge */}
            <div className="absolute top-2 left-2 w-[107px] flex items-center justify-center">
                <svg width="107" height="23" viewBox="0 0 107 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M106 1H1V22H106L100.653 12L106 1Z" fill="white" stroke="#F1F1F1" />
                </svg>
                <div className="absolute inset-0 flex items-center pl-2 text-[10px] text-[#41273c] font-bold text-left w-full">
                    {levelName || 'Level'}
                </div>
            </div>
        </div>
    );
};

export default CardHeader;