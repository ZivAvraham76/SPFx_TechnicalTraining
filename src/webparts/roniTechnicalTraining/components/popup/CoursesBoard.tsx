import * as React from "react";
import SingleCourse from "./SingleCourse";
import VlpHeader from "./VlpHeader";
import { forwardRef } from 'react';
import CourseBoard from "./CourseBoard";


interface Module {
  Name: string;
  Score: number;
  Completed: boolean;
  StartDate: string | null;
  LmsModuleUrl: string;
}

interface Course {
  Name: string;
  Complete: boolean;
  PercentageComplete: number;
  LmsCourseUrl: string;
  Description: string;
  Modules: Module[];
  isOptional?: boolean;

}


interface trainingObject {
  litmosLearningPathName: string;
  pillar: string;
  productName: string;
  litmosLearningPathUrl: string;
  PercentageComplete: number;
  levelName: string;
  Id: string;
}

interface CourseBoardProps {
    Courses: Course[];
    handleTrainingDataClick: (trainingObject: trainingObject) => void;
    selectedTraining?: any;
}

const CoursesBoard = forwardRef<HTMLDivElement, CourseBoardProps>(({ Courses, handleTrainingDataClick, selectedTraining }, ref) => {

  // Extract VLP data
  const VLP_PercentageComplete =   selectedTraining.PercentageComplete;
  const VLP_NAME = selectedTraining.litmosLearningPathName;





  console.log("selectedTraining:",selectedTraining);

  return (
    <div ref={ref} className="h-screen w-full py-10">
      <div className="mx-auto h-full w-9/12 rounded-3xl border-4 border-[#f0f2f4] bg-white px-10 py-10" onClick={(e) => e.stopPropagation()}>
        <div className="max-h-full overflow-y-auto px-5">
          {/* If there's only one course, render the SingleCourse component */}
          {Courses?.length === 1 ? (
            <SingleCourse courseData={Courses[0]} />
          ) : (
            <div>
           {/* if there is more than one course render the VlpHeader component and render a Popup for each course*/}


              <VlpHeader
                title={VLP_NAME}
                coursePercentageComplete={VLP_PercentageComplete}
              />
              {Courses?.map((e: any, i: number) => {
                return <CourseBoard key={i} courseData={e}/>;
                
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CoursesBoard;
