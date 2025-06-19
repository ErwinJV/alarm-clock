import React, { useCallback, useRef, useState } from "react";

interface AlarmInputProps {
  addAlarm: (inputTime: string) => void;
}

export default React.memo<AlarmInputProps>(function AlarmInput({ addAlarm }) {
  const [inputTime, setInputTime] = useState("");
  const inputDate = useRef<HTMLInputElement>(document.createElement("input"));
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputTime(e.target.value);
  }, []);

  const handleAlarm = useCallback(() => {
    addAlarm(inputTime);
    inputDate.current.value = "";
  }, [addAlarm, inputTime]);
  return (
    <div className="w-full">
      <input
        className="border-1 rounded p-1 font-ds-digital w-full"
        type="datetime-local"
        onChange={handleInput}
        ref={inputDate}
      />
      <div className="h-[20px]"></div>
      <button
        className="font-ds-digital p-3 bg-gray-500 hover:bg-gray-400  text-white rounded cursor-pointer w-full"
        onClick={handleAlarm}
      >
        Add Alarm
      </button>
    </div>
  );
});
