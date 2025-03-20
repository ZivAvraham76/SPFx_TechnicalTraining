import * as React from "react";
import SingleCourse from "./SingleCourse";
import VlpHeader from "./VlpHeader";
import Popup from "./Popup"
import { forwardRef } from 'react';


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

interface CourseBoardProps {
  data: {
    VLP_NAME: string;
    VLP_PercentageComplete: number;
    Courses: Course[];
  };
}

const CoursesBoard = forwardRef<HTMLDivElement, CourseBoardProps>(({ data }, ref) => {
  // Extract courses from the data prop
  const courses = data.Courses;
  // Extract VLP data
  const VLP_PercentageComplete = data.VLP_PercentageComplete;
  const VLP_NAME = data.VLP_NAME;

  return (
    <div ref={ref} className="relative h-[90vh] w-full flex items-center justify-center">
      <div className="mx-auto h-full w-9/12 rounded-3xl border-4 border-[#f0f2f4] bg-white px-10 py-10" onClick={(e) => e.stopPropagation()}>
        <div className="max-h-full overflow-y-auto px-5">
          {/* If there's only one course, render the SingleCourse component */}
          {courses?.length === 1 ? (
            <SingleCourse courseData={courses[0]} />
          ) : (
            <div>
           {/* if there is more than one course render the VlpHeader component and render a Popup for each course*/}
              <VlpHeader
                title={VLP_NAME}
                coursePercentageComplete={VLP_PercentageComplete}
              />
              {courses?.map((e: any, i: number) => {
                return <Popup key={i} courseData={e} data={data} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CoursesBoard;
