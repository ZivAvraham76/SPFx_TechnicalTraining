import * as React from "react";
import { useState } from 'react';
import Header from "./Header";
import CourseDescription from "./CourseDescription";
import ModulesTable from "./ModulesTable";


interface Module {
  Name: string,
  Score: number,
  Completed: boolean,
  StartDate: string | null,
  LmsModuleUrl: string,
}

interface Course {
  Name: string;
  Complete: boolean,
  PercentageComplete: number,
  LmsCourseUrl: string,
  Description: string,
  Modules: Module[],
  isOptional?: boolean,
}

interface PopupProps {
  courseData: Course;
  data: {
    VLP_NAME: string;
    VLP_PercentageComplete: number;
    Courses: Course[];
  };
}

const Popup: React.FC<PopupProps> = ({ courseData, data }) => {

  // State to manage whether the course details are visible or not
  const [isVisible, SetIsVisible] = useState(false);

  // Function to toggle the visibility of the course details
  const togglCourseDetails = () => {
    SetIsVisible(!isVisible);
  };

  return (
    <div className="h-full w-full">
      <div
        id="headerContainer"
        className="hover:cursor-pointer"
        onClick={() => togglCourseDetails()} // Toggle the details visibility when clicked
      >
        {/* Render the header component */}
        <Header
          isVisible={isVisible}
          title={courseData.Name}
          coursePercentageComplete={courseData.PercentageComplete}
          lmsCourseUrl={courseData.LmsCourseUrl}
          isOptional={courseData.isOptional}
          data={data}
        />
      </div>
      
      {/* Conditionally render the course details when `isVisible` is true */}
      {isVisible && (
        <div className="">
          <div id="courseDiscriptionContainer" className="">
            <CourseDescription courseDescription={courseData.Description} />
          </div>
          <div id="moduleTableContainer" className="">
            <ModulesTable modules={courseData.Modules} />
          </div>

        </div>
      )}

    </div>
  );
};

export default Popup;
