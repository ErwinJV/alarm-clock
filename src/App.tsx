import React, { useCallback, useState } from "react";

import AlarmClock from "./components/AlarmClock/AlarmClock";

import { useSound } from "./hooks/activate-alarm";

import timeToMakeHistory from "./assets/songs/time-to-make-history/TimeToMakeHistoryShihokoHirata.mp3";
import p4GImage from "./assets/songs/time-to-make-history/p4GT.jpg";

import sirAlonneSong from "./assets/songs/sir-alonne/sir-alonne.mp3";
import sirAlonneCover from "./assets/songs/sir-alonne/sir-alonne .jpg";

import spanishGuitarSong from "./assets/songs/spanish-guitar/spanish-guitar.mp3";
import spanishGuitarCover from "./assets/songs/spanish-guitar/spanish-guitar.jpg";

import SelectSong from "./components/SelectSong";
import type { Song } from "./types/song";
import { Button } from "@mui/material";

const songs: Song[] = [
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
  {
    coverPath: spanishGuitarCover,
    soundPath: spanishGuitarSong,
    title: "Spanish Guitar",
  },
];

export default React.memo(function App() {
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [isSettled, setIsSettled] = useState<boolean>(false);

  const { isPlaying, play, stop } = useSound(songs[currentSong].soundPath);

  const toggleSong = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, play, stop]);

  const selectNextSong = useCallback(() => {
    if (isSettled) return;
    if (isPlaying) return;

    if (currentSong + 1 > songs.length - 1) {
      setCurrentSong(0);
      return;
    }

    setCurrentSong((current) => current + 1);
  }, [currentSong, isPlaying, isSettled]);

  const selectPreviousSong = useCallback(() => {
    if (isSettled) return;
    if (isPlaying) return;

    if (currentSong - 1 < 0) {
      setCurrentSong(songs.length - 1);
      return;
    }

    setCurrentSong((current) => current - 1);
  }, [currentSong, isPlaying, isSettled]);

  const toggleSettled = useCallback(() => {
    setIsSettled((current) => !current);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url(./assets/backgrounds/dawn.jpg)] bg-cover">
      <div className="w-full flex flex-col items-center md:flex-row md:justify-around">
        <div className="flex flex-col items-center my-4 md:my-0 ">
          <AlarmClock play={play} isSettled={isSettled} />
          {isSettled ? (
            <span className="text-xl text-white my-1">Alarm is set!</span>
          ) : (
            <div className="h-[28px]"></div>
          )}
          <Button
            className="uppercase font-bold text-2xl "
            onClick={toggleSettled}
            color="error"
            variant="contained"
          >
            {isSettled ? "Cancel" : "Set Alarm"}
          </Button>
        </div>

        <div className="flex flex-col items-center my-4 md:my-0 ">
          <h4 className="text-xl font-bold">Select Song</h4>
          <SelectSong
            coverPath={songs[currentSong].coverPath}
            selectNextSong={selectNextSong}
            selectPreviousSong={selectPreviousSong}
            title={songs[currentSong].title}
          />
          <Button
            className="uppercase font-bold text-2xl "
            onClick={toggleSong}
            color="error"
            variant="contained"
          >
            {isPlaying ? "stop" : "play"}
          </Button>
        </div>
      </div>
    </div>
  );
});
