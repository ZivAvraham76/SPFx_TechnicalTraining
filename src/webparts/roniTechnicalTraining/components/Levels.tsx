import * as React from 'react';
import { useState } from 'react';
import '../../../../assets/dist/tailwind.css';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

// Define the props for the LevelToolbar component
interface LevelsProps {
    selectedLevel: string;// Currently selected level
    onLevelChange: (level: string) => void;// Callback function to handle level changes
}

// Functional component to render a dropdown for selecting course levels
const Levels: React.FC<LevelsProps> = ({ selectedLevel, onLevelChange }) => {
    const levels = [ 'All levels','Fundamentals','Advanced', 'Expert'];
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleLevelClick = (level: string) => {
        onLevelChange(level);
        setIsOpen(false);
    };
   return(
    <div className="relative inline-block text-left h-full">
    <button onClick={toggleDropdown} className="w-[150px] h-8 px-2 py-1 pr-8 rounded-lg text-[#41273c] text-lg ring-gray-400 flex items-center justify-between whitespace-nowrap w-[120px] border border-[#41273c]">
    <span className="text-[#41273c] text-sm font-medium">
    {selectedLevel === "All Levels" ? "Select Level" : selectedLevel}
        </span>
        <svg className="absolute right-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" fill="#41273C"/>
        </svg> 
    </button>

    {isOpen && (
        <div className="absolute mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50">
            {levels.map((level) => (
                <button
                    key={level}
                    onClick={() => handleLevelClick(level)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                        level === selectedLevel
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                    {level}
                </button>
            ))}
        </div>
    )}
</div>
);
};
// Export the component for use in other parts of the application
export default Levels;