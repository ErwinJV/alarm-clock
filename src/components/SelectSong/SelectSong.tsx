import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { useCallback } from "react";
import Pad from "../Pad";

interface SelectSongProps {
  coverPath: string;
  selectPreviousSong: () => void;
  selectNextSong: () => void;
  title: string;
}

export default function SelectSong({
  coverPath,
  selectNextSong,
  selectPreviousSong,
  title,
}: SelectSongProps) {
  const handleNextSong = useCallback(() => {
    selectNextSong();
  }, [selectNextSong]);
  const handlePreviousSong = useCallback(() => {
    selectPreviousSong();
  }, [selectPreviousSong]);
  return (
    <div className="flex justify-center items-center p-2 bg-transparent rounded">
      <button
        className="p-1 rounded-full bg-gray-500 cursor-pointer"
        onClick={handlePreviousSong}
      >
        <IoArrowBack className="text-2xl text-white" />
      </button>
      <Pad amt={5} row />
      <span className="relative">
        <h4 className="mb-1 absolute right-0 top-0 p-1 bg-black opacity-70 text-white">
          {title}
        </h4>
        <img src={coverPath} alt={title} className="w-[320px] h-[240px]" />
      </span>
      <Pad amt={5} row />
      <button
        className="p-1 rounded-full bg-gray-500 cursor-pointer"
        onClick={handleNextSong}
      >
        <IoArrowForward className="text-2xl text-white" />
      </button>
    </div>
  );
}
