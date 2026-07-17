export type Alarms = { [key: string]: true };

export interface AlarmTime {
  hours: number;
  minutes: number;
}

export interface UseAlarmReturn {
  alarmTime: AlarmTime | null;
  isTriggered: boolean;
  scheduleAlarm: (hours: number, minutes: number) => void;
  stopAlarm: () => void;
}
