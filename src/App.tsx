import React, { useEffect, useState } from "react";
import { AlarmsContext } from "./context/alarms";
import { TimeContext } from "./context/time-context";
import AlarmClock from "./components/AlarmClock/AlarmClock";
import AlarmInput from "./components/AlarmInput/AlarmInput";
import type { Alarms } from "./types/alarm";
import ListAlarm from "./components/ListAlarm";
import { activateAlarm } from "./helpers/activate-alarm";
import { useSound } from "./hooks/activate-alarm";

import sound from "./assets/TimeToMakeHistoryShihokoHirata.mp3";

export default React.memo(function App() {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState<Alarms>({});

  const { isPlaying, play, stop } = useSound(sound);

  const addAlarm = (inputDate: string) => {
    if (!inputDate) {
      alert("Empty input!!");
      return;
    }
    const date = new Date(inputDate);

    setAlarms((current) => ({
      ...current,
      [date.toLocaleString()]: true,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (alarms[new Date().toLocaleString()]) {
        activateAlarm();
        play();
      }

      if (isPlaying) {
        return;
      }

      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [alarms, isPlaying, play]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <TimeContext value={time}>
        <AlarmsContext value={alarms}>
          <div className="inline-block ">
            <AlarmClock />
            <AlarmInput addAlarm={addAlarm} />
            {isPlaying ? (
              <button onClick={() => stop()} className="p-4">
                Stop Alarm
              </button>
            ) : (
              <></>
            )}
            <ListAlarm />
          </div>
        </AlarmsContext>
      </TimeContext>
    </div>
  );
});
