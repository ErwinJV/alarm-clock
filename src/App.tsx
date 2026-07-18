import React, { useCallback, useEffect, useState } from "react";

import { Button } from "@mui/material";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";

import { useSound } from "./hooks/useSound";

import timeToMakeHistory from "./assets/songs/time-to-make-history/TimeToMakeHistoryShihokoHirata.mp3";
import p4GImage from "./assets/songs/time-to-make-history/p4GT.jpg";

import sirAlonneSong from "./assets/songs/sir-alonne/sir-alonne.mp3";
import sirAlonneCover from "./assets/songs/sir-alonne/sir-alonne .jpg";

import spanishGuitarSong from "./assets/songs/spanish-guitar/spanish-guitar.mp3";
import spanishGuitarCover from "./assets/songs/spanish-guitar/spanish-guitar.jpg";

import AlarmClock from "./components/AlarmClock/AlarmClock";
import SelectSong from "./components/SelectSong";

import type { Song } from "./types/song";

import Pad from "./components/Pad";

import { useAlarm } from "./hooks/useAlarm";

const songs: Song[] = [
  {
    coverPath: spanishGuitarCover,
    soundPath: spanishGuitarSong,
    title: "Spanish Guitar",
  },
  {
    coverPath: p4GImage,
    soundPath: timeToMakeHistory,
    title: "Time to make history",
  },
  {
    coverPath: sirAlonneCover,
    soundPath: sirAlonneSong,
    title: "Sir Alonne",
  },
];

export default React.memo(function App() {
  const [currentSong, setCurrentSong] = useState<number>(0);

  const { isPlaying, play, stop } = useSound(songs[currentSong].soundPath);

  const { alarmTime, isTriggered, scheduleAlarm, stopAlarm } = useAlarm();

  const toggleSong = useCallback(() => {
    if (isPlaying) {
      if (isTriggered) {
        stopAlarm();
      }
      stop();
    } else {
      play();
    }
  }, [isPlaying, isTriggered, play, stop, stopAlarm]);

  const selectNextSong = useCallback(() => {
    if (isPlaying) return;

    if (currentSong + 1 > songs.length - 1) {
      setCurrentSong(0);
      return;
    }

    setCurrentSong((current) => current + 1);
  }, [currentSong, isPlaying]);

  const selectPreviousSong = useCallback(() => {
    if (isPlaying) return;

    if (currentSong - 1 < 0) {
      setCurrentSong(songs.length - 1);
      return;
    }

    setCurrentSong((current) => current - 1);
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (isTriggered) {
      play();
    }
  }, [isTriggered, play, stop]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url(./assets/backgrounds/dawn.jpg)] bg-cover  flex-col">
      <h1 className="text-4xl font-bold text-center text-white p-2 rounded-xl bg-black/50">
        Alarm Clock
      </h1>
      <Pad amt={40} />
      <div className="w-full flex flex-col items-center md:flex-row md:justify-around">
        <div className="flex flex-col items-center my-4 md:my-0 ">
          <AlarmClock alarmTime={alarmTime} scheduleAlarm={scheduleAlarm} />
        </div>

        <div className="flex flex-col items-center my-4 md:my-0 ">
          <h4 className="text-2xl font-bold text-white bg-black/50 p-2 rounded-xl">
            Select Song
          </h4>
          <SelectSong
            coverPath={songs[currentSong].coverPath}
            selectNextSong={selectNextSong}
            selectPreviousSong={selectPreviousSong}
            title={songs[currentSong].title}
          />
          <Button
            className="uppercase font-bold text-2xl "
            onClick={toggleSong}
            color={isPlaying ? "inherit" : "error"}
            variant="contained"
          >
            {isPlaying ? "stop" : "try"}
          </Button>
        </div>
      </div>
      <Pad amt={100} />
      <div className="flex">
        <a
          className="bg-white rounded-full"
          href="https://github.com/ErwinJV"
          target="_blank"
          rel="noopener noreferrer "
        >
          <IoLogoGithub size={34} />
        </a>
        <Pad amt={30} row />
        <a
          className="bg-white"
          href="https://www.linkedin.com/in/erwin-jimenez"
          target="_blank"
          rel="noopener noreferrer "
        >
          <IoLogoLinkedin size={34} />
        </a>
      </div>
    </div>
  );
});
