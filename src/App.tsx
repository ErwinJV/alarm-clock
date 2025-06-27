import React, { useCallback, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AlarmsContext } from "./context/alarms";
import { TimeContext } from "./context/time-context";
import AlarmClock from "./components/AlarmClock/AlarmClock";
import AlarmInput from "./components/AlarmInput/AlarmInput";
import type { Alarms } from "./types/alarm";
import ListAlarm from "./components/ListAlarm";
import { activateAlarm } from "./helpers/activate-alarm";
import { useSound } from "./hooks/activate-alarm";

import sound from "./assets/TimeToMakeHistoryShihokoHirata.mp3";
import Pad from "./components/Pad";
import { Box, Paper } from "@mui/material";

export default React.memo(function App() {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState<Alarms>({});

  const { isPlaying, play, stop } = useSound(sound);

  const addAlarm = (inputDate: string) => {
    if (!inputDate) {
      alert("Empty input!!");
      return;
    }
    console.log({ inputDate });
    setAlarms((current) => ({
      ...current,
      [inputDate]: true,
    }));
  };

  const deleteAlarm = useCallback(
    (inputDate: string) => {
      const _alarms: Alarms = {};
      for (const alarm in alarms) {
        if (alarm !== inputDate) {
          _alarms[alarm] = alarms[alarm];
        }
      }

      setAlarms(_alarms);
    },
    [alarms]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date().toLocaleString().split(",")[1].trimStart();

      if (alarms[date]) {
        activateAlarm();
        play();
      }

      if (!isPlaying) {
        setTime(new Date());
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [alarms, isPlaying, play]);

  useEffect(() => {
    if (Object.keys(alarms).length) {
      window.localStorage.setItem("ALARMS", JSON.stringify(alarms));
    }
  }, [alarms]);

  useEffect(() => {
    const data = window.localStorage.getItem("ALARMS") || "{}";

    setAlarms(JSON.parse(data));
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url(./assets/clock-square-svgrepo-com.svg)] bg-size-[10px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeContext value={time}>
          <AlarmsContext value={alarms}>
            <Box
              component={Paper}
              elevation={10}
              className="flex flex-col  items-center justify-center p-3 "
            >
              <div className="flex flex-col md:flex-row">
                <AlarmClock />
                <Pad amt={30} row />
                <AlarmInput addAlarm={addAlarm} stopAlarm={stop} />
              </div>
              <Pad amt={30} />
              <ListAlarm deleteAlarm={deleteAlarm} />
            </Box>
          </AlarmsContext>
        </TimeContext>
      </LocalizationProvider>
    </div>
  );
});
