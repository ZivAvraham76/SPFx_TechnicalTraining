import * as React from 'react';
import type { IRoniTechnicalTrainingProps } from './IRoniTechnicalTrainingProps';
import '../../../../assets/dist/tailwind.css';
import CourseCarousel from './Carousel';
import Pillars from './Pillars';
import Levels from './Levels';
import { useState, useEffect, useRef } from 'react';
// import fackdata from '../assets/fackData';
import CoursesBoard from './popup/CoursesBoard';
import { AadHttpClient } from '@microsoft/sp-http';

const RoniTechnicalTraining: React.FC<IRoniTechnicalTrainingProps> = (props) => {
  const { trainingData, description, pillars, levels } = props;

  // State to manage the currently selected subject filter
  const [selectedFilter, setSelectedFilter] = useState('Quantum');
  // State to manage the currently selected difficulty level filter
  const [selectedLevel, setSelectedLevel] = useState('Select Level');
  const [isCoursesBoardVisible, setIsCoursesBoardVisible] = useState(false);

  const [trainingDataCourses, setTrainingDataCourses] = useState<any[] | null>(null);

  const [selectedTraining, setSelectedTraining] = useState<trainingObject>();


  const popupRef = useRef<HTMLDivElement>(null); // Create a reference for the popup to detect outside clicks

  // Handle click outside of the popup to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsCoursesBoardVisible(false);
    }
  };

  // Effect to add/remove the event listener based on the popup state
  useEffect(() => {
    if (isCoursesBoardVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCoursesBoardVisible]);




  interface trainingObject {
    litmosLearningPathName: string;
    pillar: string;
    productName: string;
    litmosLearningPathUrl: string;
    PercentageComplete: number;
    levelName: string;
    Id: string;
}


  const handleTrainingDataClick = async (trainingObject: trainingObject) => {

    if (isCoursesBoardVisible) {
      setIsCoursesBoardVisible(!isCoursesBoardVisible);
      setTrainingDataCourses(null);
      return;
    }

    
    try {
      console.log('Fetching course details for ID:', trainingObject.Id);
      
      setSelectedTraining(trainingObject);

      console.log("selected object:",selectedTraining);
      
      // Use the same resource URI format as your working requests
      const trainingPortalUrl = `https://trainingportal-dev.checkpoint.com/sp-courses/4sp?course=${encodeURIComponent(trainingObject.Id)}`;
      console.log('Request URL:', trainingPortalUrl);
      
      try {
        console.log('Attempting to use existing client with same app ID');
        const response = await props.aadClient.get(
          trainingPortalUrl,
          AadHttpClient.configurations.v1
        );
        
        console.log('Response:', response.status);
        
        if (response.ok) {
          const courseData = await response.json();
          
          setTrainingDataCourses(courseData);
          setIsCoursesBoardVisible(true);
          console.log('Fetched course data:', courseData);
          console.log('Popup data:', trainingDataCourses);
          return; // Exit if successful
        } else {
          console.error('Failed with existing client:', response.statusText);
        }
      } catch (error) {
        console.error('Error with existing client:', error);
      }
      
      
    } catch (error) {
      console.error('Overall error in fetchCourseDetails:', error);
    }
    


  };


  

  useEffect(() => {
    if (trainingDataCourses) {
      setIsCoursesBoardVisible(!isCoursesBoardVisible);
    }
  }, [trainingDataCourses]);

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
      {/* Popup showing the CoursesBoard component */}
      {isCoursesBoardVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50" onClick={() => setIsCoursesBoardVisible(false)} >
          <CoursesBoard
            ref={popupRef} // Attach the popupRef to the CoursesBoard component
            Courses={trainingDataCourses || []}
            handleTrainingDataClick={handleTrainingDataClick}
            selectedTraining={selectedTraining}
          /></div>
      )}

      <div className="text-[#ee0c5d] text-[22px] font-semibold font-poppins antialiased mb-8">{description}</div>
      <div className="flex items-center justify-start space-x-4 p-2 max-w-full mb-8 overflow-visible
 ">
        <Pillars selectedFilter={selectedFilter} onFilterChange={handleFilter} pillars={pillars} />
        <Levels selectedLevel={selectedLevel} onLevelChange={handleLevelChange} levels={levels} />
      </div>
      <div id="carousel" className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth p-4"
        style={{ scrollSnapType: 'x mandatory', width: '100%', display: 'flex', flexWrap: 'nowrap' }}>

        < CourseCarousel courses={trainingData.producttraining} selectedFilter={selectedFilter} selectedLevel={selectedLevel}
          handleTrainingDataClick={(trainingObject: trainingObject) => handleTrainingDataClick(trainingObject)} />

      </div>

    </div>
  );
};
export default RoniTechnicalTraining;