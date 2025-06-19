import React, { useContext } from "react";
import { AlarmsContext } from "../../context/alarms";

export default React.memo(function ListAlarm() {
  const alarms = useContext(AlarmsContext);
  console.log({ alarms });
  return (
    <>
      <h2 className="text-center font-ds-digital text-3xl">Alarms Saved</h2>
      <ul className="font-ds-digital w-full bg-gray-300 p-2 ">
        {Object.keys(alarms).map((key) => (
          <li className="text-2xl" key={key}>
            {key}
          </li>
        ))}
      </ul>
    </>
  );
});
