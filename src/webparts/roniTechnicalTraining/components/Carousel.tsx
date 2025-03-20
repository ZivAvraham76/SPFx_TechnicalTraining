import * as React from 'react';
import Card from './Card';
// import { set } from '@microsoft/sp-lodash-subset';
import '../../../../assets/dist/tailwind.css';
interface Course {
    litmosLearningPathName: string;
    pillar: string;
    productName: string;
    litmosLearningPathUrl: string;
    PercentageComplete: number;
    levelName: string;
}

// Define the props for the CourseCarousel component
interface CourseCarouselProps {
    courses: Course[];
    selectedFilter: string;// Currently selected filter
    selectedLevel: string;// Currently selected level
    onOpenPopup: () => void;
}
// Main CourseCarousel component definition
const CourseCarousel: React.FC<CourseCarouselProps> = ({ courses, selectedFilter, selectedLevel,onOpenPopup }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    // Filter courses based on the selected filter and level
    const filteredCourses = courses.filter((course) => {
        const matchesFilter = selectedFilter === 'All' || course.pillar === selectedFilter;// Check if course matches the selected filter based on pillar
        const matchesLevel = (selectedLevel === 'Select Level' || selectedLevel === 'All levels') || course.levelName === selectedLevel;// Check if course matches the selected level
        const hasValidPercentage = course.PercentageComplete !== null && course.PercentageComplete !== undefined;
        // Include course only if both conditions are true
        return matchesFilter && matchesLevel && hasValidPercentage;
    });
    React.useEffect(() => {
        setCurrentIndex(0);
    }, [filteredCourses.length]);
    const [left, setLeft] = React.useState(false);
    const [right, setRight] = React.useState(false);
    const handleNext = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredCourses.length);
    };
    const handlePrev = (): void => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + filteredCourses.length) % filteredCourses.length
        );
    };

    React.useEffect(() => {
        if (currentIndex > filteredCourses.length - 4) {
            setRight(true);
        }
        else {
            setRight(false);
        }
    }, [currentIndex, filteredCourses]);
    React.useEffect(() => {
        if (currentIndex === 0) {
            setLeft(true);
        }
        else {
            setLeft(false);
        }
    }, [currentIndex, filteredCourses]);

    return (
        <div className='relative w-full mx-auto overflow-hidden'>
            <div
                className="flex transition-transform duration-500 ease-in-out gap-[15px]"
                style={{ transform: `translateX(-${currentIndex * 25}%)` }}
            >
                {filteredCourses.map((course, index) => (
                    <div key={index} className={`relative w-1/4 flex-shrink-0`}>
                        <Card data={course} onOpenPopup={onOpenPopup}  />
                    </div>

                ))}
            </div>
            {!right && (
                <button className="border border-[#41273c] absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100" onClick={handleNext}>
                    <svg
                        className="h-4 w-4 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 9l4-4-4-4"
                        />
                    </svg></button>
            )}
            {!left && (<button className="border border-[#41273c] absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100" onClick={handlePrev}>
                <svg
                    className="h-4 w-4 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 9L1 5l4-4"
                    />
                </svg></button>)}
        </div>
    )
};
export default CourseCarousel;