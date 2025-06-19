import { useState, useEffect, useRef } from "react";

type UseSoundHook = {
  play: () => void;
  stop: () => void;
  isPlaying: boolean;
};

export const useSound = (
  soundFile: string = "../assets/TimeToMakeHistoryShihokoHirata.mp3"
): UseSoundHook => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializa el audio cuando el componente se monta
  useEffect(() => {
    audioRef.current = new Audio(soundFile);

    // Configura eventos para actualizar el estado
    audioRef.current.addEventListener("play", () => setIsPlaying(true));
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    audioRef.current.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      // Limpieza al desmontar
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeEventListener("play", () => setIsPlaying(true));
        audioRef.current.removeEventListener("ended", () =>
          setIsPlaying(false)
        );
        audioRef.current.removeEventListener("pause", () =>
          setIsPlaying(false)
        );
      }
    };
  }, [soundFile]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia si ya estaba reproduciéndose
      audioRef.current.play().catch((error) => {
        console.error("Error al reproducir sonido:", error);
      });
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, stop, isPlaying };
};
