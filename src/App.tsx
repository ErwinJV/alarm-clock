import React, { useEffect, useState } from "react";

import { AlarmsContext } from "./context/alarms";
import { TimeContext } from "./context/time-context";
import AlarmClock from "./components/AlarmClock/AlarmClock";

import type { Alarms } from "./types/alarm";

import { activateAlarm } from "./helpers/activate-alarm";
import { useSound } from "./hooks/activate-alarm";

import sound from "./assets/TimeToMakeHistoryShihokoHirata.mp3";

import p4GImage from "./assets/songs/time-to-make-history/p4GT.jpg";

import SelectSong from "./components/SelectSong";

export default React.memo(function App() {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState<Alarms>({});

  const { isPlaying, play } = useSound(sound);

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
      <TimeContext value={time}>
        <AlarmsContext value={alarms}>
          <div className="flex flex-col md:flex-row">
            <AlarmClock />
            <SelectSong
              coverPath={p4GImage}
              selectNextSong={() => {}}
              selectPreviousSong={() => {}}
              title="Time to make history"
            />
          </div>
        </AlarmsContext>
      </TimeContext>
    </div>
  );
});
