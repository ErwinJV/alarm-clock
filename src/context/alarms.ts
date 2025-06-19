import { createContext } from "react";
import type { Alarms } from "../types/alarm";

export const AlarmsContext = createContext<Alarms>({});
