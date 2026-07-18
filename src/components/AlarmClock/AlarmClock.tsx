import React, { useCallback, useRef } from "react";

// import { padZero } from "../../helpers/pad-zero";
import Pad from "../Pad";
import { IoAdd, IoRemove } from "react-icons/io5";
import type { AlarmTime } from "../../types/alarm";
// import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface AlarmClockProps {
  scheduleAlarm: (hours: number, minutes: number) => void;
  alarmTime: AlarmTime | null;
}

export default React.memo<AlarmClockProps>(function AlarmClock({
  alarmTime,

  scheduleAlarm,
}) {
  const currentTimeRef = useRef<HTMLSpanElement>(
    document.createElement("span"),
  );

  const { hours, minutes } = alarmTime || { hours: 0, minutes: 0 };

  const maxHour = useCallback(() => {
    if (hours >= 23) return;
    scheduleAlarm(hours + 1, minutes);
  }, [hours, minutes, scheduleAlarm]);

  const minHour = useCallback(() => {
    if (hours <= 0) return;
    scheduleAlarm(hours - 1, minutes);
  }, [hours, minutes, scheduleAlarm]);

  const maxMinute = useCallback(() => {
    if (minutes >= 59) return;
    scheduleAlarm(hours, minutes + 1);
  }, [hours, minutes, scheduleAlarm]);

  const minMinute = useCallback(() => {
    if (minutes <= 0) return;
    scheduleAlarm(hours, minutes - 1);
  }, [hours, minutes, scheduleAlarm]);

  return (
    <div className="bg-black p-6 flex flex-col rounded-2xl scale-120 ">
      <div className="text-white flex justify-between ">
        <Pad amt={20} row />{" "}
        <span ref={currentTimeRef} className="text-xs font-bold p-1">
          {/* Current time is: {formatTime()} */}
        </span>
      </div>
      <div className="bg-[#748079]  flex justify-center items-center  w-42">
        <span className="font-ds-digital  text-7xl text-center  ">{hours}</span>
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
        {/* <Pad amt={20} />
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
        </RadioGroup> */}
      </div>
    </div>
  );
});
