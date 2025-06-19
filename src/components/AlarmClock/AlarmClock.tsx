import React, { useContext } from "react";
import { TimeContext } from "../../context/time-context";

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
    <div className="bg-black p-10 inline-block">
      <div className="bg-white p-4 ">
        <div className="bg-[#748079] p-1 flex justify-center">
          <span className="font-ds-digital text-4xl sm:text-5xl md:text-7xl lg:text-9xl ">
            {formatTime()}
          </span>
        </div>
      </div>
    </div>
  );
});

function padZero(num: number) {
  return (num < 10 ? "0" : "") + num;
}
