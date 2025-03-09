import * as React from 'react';
import { useState } from 'react';
import type { IRoniTechnicalTrainingProps } from './IRoniTechnicalTrainingProps';
import '../../../../assets/dist/tailwind.css';
import CourseCarousel from './Carousel';
import Pillars from './Pillars';
import Levels from './Levels';

const RoniTechnicalTraining: React.FC<IRoniTechnicalTrainingProps>= (props) => {
  const { trainingData, description , pillars, levels} = props;
  // State to manage the currently selected subject filter
  const [selectedFilter, setSelectedFilter] = useState('All');
  // State to manage the currently selected difficulty level filter
  const [selectedLevel, setSelectedLevel] = useState('Select Product');

  // Function to handle changes in the course subject filter
  const handleFilter = (filter: string): void => {
    setSelectedFilter(filter);
  };

  // Function to handle changes in the level filter
  const handleLevelChange = (level: string): void => {
    setSelectedLevel(level);
  };


  return (
    <div className="w-full  relative overflow-x-hidden">
      <div className="text-[#ee0c5d] text-[22px] font-semibold font-poppins antialiased">{description}</div>
      <div className="flex justify-right items-center p-2 gap-4 mt-2 ">
        <Pillars selectedFilter={selectedFilter} onFilterChange={handleFilter} pillars={pillars}/>
        <Levels selectedLevel={selectedLevel} onLevelChange={handleLevelChange} levels={levels} />
      </div>
      <div id="carousel" className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth p-4"
        style={{ scrollSnapType: 'x mandatory', width: '100%', display: 'flex', flexWrap: 'nowrap' }}>

        < CourseCarousel courses={trainingData.producttraining} selectedFilter={selectedFilter} selectedLevel={selectedLevel} />

      </div>
    </div>

  );
};
export default RoniTechnicalTraining;