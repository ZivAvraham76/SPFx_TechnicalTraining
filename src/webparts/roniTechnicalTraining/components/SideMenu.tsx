// import * as React from "react";

// const demoCourses = [
//   "Demo 1", "Demo 2", "Demo 3", "Demo 4", "Demo 5", "Demo 6", 
//   "Demo 7", "Demo 8", "Demo 9", "Demo 10", "Demo 11", "Demo 12", 
//   "Demo 13", "Demo 14"
// ];

// interface SidebarProps {
//     isOpen: boolean;
//     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
// }

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//     <div
//       className={`flex-1 border-[#41273c] border-2 bg-white h-auto transition-all duration-300 overflow-y-auto z-50 ${isOpen ? "w-64" : "hidden"}`}
//       style={{ maxHeight: '500px' }} // Adjust the height as needed
//     >
//            <button 
//                 className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900"
//                 onClick={() => setIsOpen(false)}
//             >
//                 ✖
//             </button>
//       {/* Course List */}
//       <ul className="mt-4 space-y-1 space-x-1">
//         {demoCourses.map((course, index) => (
//         <div key={index} className={`p-2 text-gray-700 text-md font-semibold bg-gray-200 rounded-md`}>{course}</div>
//         ))}
//       </ul>
//     </div>
//     </div>
//   );
// }

// export default Sidebar;
