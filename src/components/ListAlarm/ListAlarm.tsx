import React, { Fragment, useCallback, useContext } from "react";
import { AlarmsContext } from "../../context/alarms";
import Pad from "../Pad";
import { Box, Paper } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";

interface ListAlarmProps {
  deleteAlarm: (inputDate: string) => void;
}

export default React.memo<ListAlarmProps>(function ListAlarm({ deleteAlarm }) {
  const alarms = useContext(AlarmsContext);
  const alarmKeys = Object.keys(alarms);
  return (
    <>
      <>
        {alarmKeys.length ? (
          <>
            <Box className=" w-[320px]  p-3 h-[260px] overflow-y-auto  flex flex-col justify-center rounded ">
              <>
                {alarmKeys.map((alarm) => (
                  <Alarm alarm={alarm} key={alarm} deleteAlarm={deleteAlarm} />
                ))}
              </>
            </Box>
            <Pad amt={30} />
          </>
        ) : (
          <></>
        )}
      </>
    </>
  );
});

const Alarm = ({
  alarm,
  deleteAlarm,
}: {
  alarm: string;
  deleteAlarm: (alarm: string) => void;
}) => {
  const handleAlarm = useCallback(() => {
    deleteAlarm(alarm);
  }, [alarm, deleteAlarm]);
  return (
    <Fragment>
      <Box
        component={Paper}
        elevation={6}
        className="text-xl p-1 flex justify-between"
      >
        <span> {alarm}</span>
        <DeleteRounded
          onClick={handleAlarm}
          className="cursor-pointer"
          color="error"
        />
      </Box>
      <Pad amt={20} />
    </Fragment>
  );
};
