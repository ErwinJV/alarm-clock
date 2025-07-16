import React, { useCallback, useEffect, useRef, useState } from "react";

import { padZero } from "../../helpers/pad-zero";
import Pad from "../Pad";
import { IoAdd, IoRemove } from "react-icons/io5";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface AlarmClockProps {
  play: () => void;
  isSettled: boolean;
}

export default React.memo<AlarmClockProps>(function AlarmClock({
  play,
  isSettled,
}) {
  const [hour, setHour] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");
  const [meridiem, setMeridiem] = useState<"AM" | "PM">("AM");
  const currentTimeRef = useRef<HTMLSpanElement>(
    document.createElement("span")
  );

  const minHour = useCallback(() => {
    if (isSettled) return;
    const numHour = parseInt(hour);

    const res = numHour - 1;
    if (res < 1) return;
    setHour(padZero(res));
  }, [hour, isSettled]);

  const maxHour = useCallback(() => {
    if (isSettled) return;
    const numHour = parseInt(hour);
    const res = numHour + 1;
    if (res > 12) return;
    setHour(padZero(res));
  }, [hour, isSettled]);

  const minMinute = useCallback(() => {
    if (isSettled) return;
    const numMinutes = parseInt(minutes);

    const res = numMinutes - 1;
    if (res < 1) return;
    setMinutes(padZero(res));
  }, [isSettled, minutes]);

  const maxMinute = useCallback(() => {
    if (isSettled) return;
    const numMinutes = parseInt(minutes);
    const res = numMinutes + 1;
    if (res > 59) return;
    setMinutes(padZero(res));
  }, [isSettled, minutes]);

  const setMeridiemToAM = useCallback(() => {
    if (isSettled) return;
    setMeridiem("AM");
  }, [isSettled]);

  const setMeridiemToPM = useCallback(() => {
    if (isSettled) return;
    setMeridiem("PM");
  }, [isSettled]);

  // function formatTime() {
  //   let hours = time?.getHours();
  //   const minutes = time.getMinutes();
  //   const seconds = time.getSeconds();
  //   const meridiem = hours >= 12 ? "PM" : "AM";

  //   hours = hours % 12 || 12;

  //   return `${padZero(
  //     hours
  //   )}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date().toLocaleString().split(",")[1].trimStart();
      currentTimeRef.current.innerHTML = `Current time: ${date}`;
      if (date === `${hour}:${minutes}:00 ${meridiem}`) {
        play();
      }
      console.log({ date, alarm: `${hour}:${minutes}:00 ${meridiem}` });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [hour, meridiem, minutes, play]);

  return (
    <div className="bg-black p-6 flex flex-col rounded-2xl ">
      <div className="text-white flex justify-between ">
        <Pad amt={20} row />{" "}
        <span ref={currentTimeRef} className="text-xs font-bold p-1">
          {/* Current time is: {formatTime()} */}
        </span>
      </div>
      <div className="bg-[#748079]  flex justify-between items-center p-2">
        <span className="font-ds-digital  text-7xl text-center  ">{hour}</span>
        <span className="font-ds-digital  text-7xl text-center  ">:</span>
        <span className="font-ds-digital  text-7xl text-center  ">
          {minutes}
        </span>
      </div>
      <Pad amt={10} />
      {/**Time set */}
      <div className="flex flex-col bg-gray-800 p-2">
        <div className="flex  justify-between ">
          {/**Hour */}
          <div className="flex">
            <button
              className="bg-gray-600 rounded-full cursor-pointer"
              onClick={maxHour}
            >
              <IoAdd color="white" className="text-2xl" />
            </button>
            <Pad amt={10} row />
            <button
              className="bg-gray-600 rounded-full cursor-pointer"
              onClick={minHour}
            >
              <IoRemove color="white" className="text-2xl" />
            </button>
          </div>

          {/**Minutes */}
          <div className="flex">
            <button
              className="bg-gray-600 rounded-full cursor-pointer"
              onClick={maxMinute}
            >
              <IoAdd color="white" className="text-2xl" />
            </button>
            <Pad amt={10} row />
            <button
              className="bg-gray-600 rounded-full cursor-pointer"
              onClick={minMinute}
            >
              <IoRemove color="white" className="text-2xl" />
            </button>
          </div>
        </div>
        <Pad amt={20} />
        <RadioGroup
          aria-labelledby="radio-meridiem"
          defaultValue={meridiem}
          name="radio-meridiem-group"
          row
        >
          <FormControlLabel
            className="text-white font-xs"
            control={<Radio />}
            label="AM"
            onClick={setMeridiemToAM}
            value="AM"
          />
          <FormControlLabel
            className="text-white font-xs"
            control={<Radio />}
            label="PM"
            onClick={setMeridiemToPM}
            value="PM"
          />
        </RadioGroup>
      </div>
    </div>
  );
});
