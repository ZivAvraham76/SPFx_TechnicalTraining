import * as React from 'react';
import { useState } from 'react';
import type { IRoniTechnicalTrainingProps } from './IRoniTechnicalTrainingProps';
import '../../../../assets/dist/tailwind.css';
import CourseCarousel from './Carousel';
import Pillars from './Pillars';
import Levels from './Levels';
// import Sidebar from './SideMenu';

const RoniTechnicalTraining: React.FC<IRoniTechnicalTrainingProps> = (props) => {
  const { trainingData, description, pillars, levels } = props;

  // State to manage the currently selected subject filter
  const [selectedFilter, setSelectedFilter] = useState('Quantum');
  // State to manage the currently selected difficulty level filter
  const [selectedLevel, setSelectedLevel] = useState('Select Level');
  const [isOpen, setIsOpen] = React.useState(false);

  // Function to handle changes in the course subject filter
  const handleFilter = (filter: string): void => {
    setSelectedFilter(filter);
  };

  // Function to handle changes in the level filter
  const handleLevelChange = (level: string): void => {
    setSelectedLevel(level);
  };


  return (
    <div className="w-full relative overflow-x-hidden p-4 ">
      {/* <div className='absolute right-0 top-0 overflow-visble'>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div> */}
      <div className="text-[#ee0c5d] text-[22px] font-semibold font-poppins antialiased mb-8">{description}</div>
      <div className="flex items-center justify-start space-x-4 p-2 max-w-full mb-8 overflow-visible
 ">
        <Pillars selectedFilter={selectedFilter} onFilterChange={handleFilter} pillars={pillars} />
        <Levels selectedLevel={selectedLevel} onLevelChange={handleLevelChange} levels={levels} />
      </div>
      <div id="carousel" className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth p-4"
        style={{ scrollSnapType: 'x mandatory', width: '100%', display: 'flex', flexWrap: 'nowrap' }}>

        < CourseCarousel courses={trainingData.producttraining} selectedFilter={selectedFilter} selectedLevel={selectedLevel}
          setIsOpen={setIsOpen} isOpen={isOpen} />

      </div>

    </div>
  );
};
export default RoniTechnicalTraining;