import React, { useContext } from "react";
import { TimeContext } from "../../context/time-context";
import { padZero } from "../../helpers/pad-zero";

export default React.memo(function AlarmClock() {
  const time = useContext(TimeContext) || new Date();

  function formatTime() {
    let hours = time?.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const meridiem = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${padZero(
      hours
    )}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
  }

  return (
    <div className="bg-black p-10 flex ">
      <div className="bg-white p-4  flex">
        <div className="bg-[#748079] w-[172px] md:w-[400px] flex justify-center items-center p-2">
          <span className="font-ds-digital  text-4xl  md:text-7xl text-center  ">
            {formatTime()}
          </span>
        </div>
      </div>
    </div>
  );
});
