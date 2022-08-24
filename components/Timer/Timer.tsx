import { Alert } from "@material-tailwind/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const Timer: NextPage = () => {
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    setSeconds((p) => p - 1);
  }, []);
  return (
    <div className="w-full">
      <Alert className="mt-4 rounded-none" variant="gradient">
        00:00:{seconds < 10 ? "0" + seconds : seconds}
      </Alert>
    </div>
  );
};

export default Timer;
