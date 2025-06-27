import { MultiSectionDigitalClock } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

import { Box } from "@mui/material";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import Pad from "../Pad";
import { padZero } from "../../helpers/pad-zero";
import { AddAlarm, StopCircleSharp, StopSharp } from "@mui/icons-material";

interface AlarmInputProps {
  addAlarm: (inputTime: string) => void;
  stopAlarm: () => void;
}

export default React.memo<AlarmInputProps>(function AlarmInput({
  addAlarm,
  stopAlarm,
}) {
  const [inputTime, setInputTime] = useState<Dayjs | null>(
    dayjs("2022-04-17T12:00")
  );

  const handleInput = useCallback((e: PickerValue) => {
    setInputTime(e);
  }, []);

  const handleAlarm = useCallback(() => {
    const hour = (inputTime?.hour() || 0) % 12 || 12;
    const minutes = padZero(inputTime?.minute() || 0);
    const milliseconds = padZero(inputTime?.millisecond() || 0);
    const meridiem = inputTime?.hour() || 0 >= 12 ? "PM" : "AM";

    addAlarm(`${hour}:${minutes}:${milliseconds} ${meridiem}`);
    setInputTime(dayjs("2022-04-17T12:00"));
  }, [addAlarm, inputTime]);

  return (
    <div className="w-full flex justify-center items-center">
      <DemoContainer components={["TimeClock"]}>
        <DemoItem>
          <MultiSectionDigitalClock
            value={inputTime}
            onChange={handleInput}
            timeSteps={{ minutes: 1 }}
            className="bg-white "
          />
        </DemoItem>
      </DemoContainer>
      <Pad amt={60} row />
      <Box className="flex flex-col ">
        <AddAlarm
          onClick={handleAlarm}
          color="success"
          className="text-6xl cursor-pointer "
        />
        <Pad amt={20} />
        <StopCircleSharp
          onClick={stopAlarm}
          className="text-6xl cursor-pointer "
          color="error"
        />
      </Box>
    </div>
  );
});
