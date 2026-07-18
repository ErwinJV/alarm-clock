import { useState, useRef, useCallback, useEffect } from "react";
import type { AlarmTime, UseAlarmReturn } from "../types/alarm";

export const useAlarm = (): UseAlarmReturn => {
  const [alarmTime, setAlarmTime] = useState<AlarmTime | null>(null);
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const alarmTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculateTimeUntilAlarm = (
    targetHours: number,
    targetMinutes: number,
  ): number => {
    const now = new Date();
    const target = new Date();
    target.setHours(targetHours, targetMinutes, 0, 0);

    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    return target.getTime() - now.getTime();
  };

  const scheduleAlarm = useCallback((hours: number, minutes: number): void => {
    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
    }

    const timeUntilAlarm = calculateTimeUntilAlarm(hours, minutes);

    alarmTimeoutRef.current = setTimeout(() => {
      setIsTriggered(true);
    }, timeUntilAlarm);

    setAlarmTime({ hours, minutes });
    setIsTriggered(false);
  }, []);

  const stopAlarm = useCallback((): void => {
    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current = null;
    }
    setIsTriggered(false);
    setAlarmTime(null);
  }, []);

  useEffect(() => {
    return () => {
      if (alarmTimeoutRef.current) {
        clearTimeout(alarmTimeoutRef.current);
      }
    };
  }, []);

  return {
    alarmTime,
    isTriggered,
    scheduleAlarm,
    stopAlarm,
  };
};
