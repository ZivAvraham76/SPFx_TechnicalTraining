import * as React from 'react';
import '../../../../assets/dist/tailwind.css';
// Define the props for the CourseFilter component
interface PillarProps {
  selectedFilter: string;// Currently selected filter value
  onFilterChange: (filter: string) => void;// Callback function to handle filter changes
  pillars: string[];// List of available filters
}

// Functional component to render filter buttons for courses
const Pillar: React.FC<PillarProps> = ({ selectedFilter, onFilterChange , pillars }) => {
  // Define the list of available filters
  const filters = pillars;
  // console.log("can you see me",filters);
  // const filters = ['Quantum', 'Harmony', 'CloudGuard', 'Infinity'];


  return (
    <div className="flex items-center gap-2">
        <div className="text-[#41273c] text-sm font-semibold">Pillar</div>
    <div className="h-8 text-xs flex border border-[#41273c] rounded-3xl overflow-hidden divide-x divide-[#41273c]">
        {filters?.map((filter) => (
            <button
                key={filter}
                className={`px-3 py-1 font-medium transition-colors duration-200 
                    ${selectedFilter === filter ? 'bg-[#41273c] text-white' : 'bg-white text-[#41273c] hover:bg-[#896f85] hover:text-white'}`}
                onClick={() => onFilterChange(filter)}
            >
                {filter}
            </button>
        ))}
    </div>
    </div>
);
};

// Export the component for use in other parts of the application
export default Pillar;

