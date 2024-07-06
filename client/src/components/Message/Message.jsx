import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Message({ msg, color }) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  let borderColorClass, textColorClass;
  switch (color) {
    case "red":
      borderColorClass = "border-red-500";
      textColorClass = "text-red-600";
      break;
    case "blue":
      borderColorClass = "border-blue-500";
      textColorClass = "text-blue-600";
      break;
    case "purple":
      borderColorClass = "border-purple-500";
      textColorClass = "text-purple-600";
      break;
    default:
      borderColorClass = "border-green-500";
      textColorClass = "text-green-600";
      break;
  }

  return (
    <>
      <div className={`rounded-md border-l-4 ${borderColorClass} bg-${color}-100 p-1 my-1`}>
        <div className="text-center space-x-4">
          <div
            className="text-center"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <p className={`text-sm font-medium ${textColorClass}`}>
              {msg}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
