"use client";
import { AppContext } from "@/app/utils/providers";
import { Card, CardBody, Progress } from "@nextui-org/react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import DaynightDisplay from "../components/daynight-display";
import Clock from "react-live-clock";

const Timeline = () => {
  const marketData = useContext(AppContext);
  const [mktStatus, setMktStatus] = useState("--");
  const initialTime = new Date();
  initialTime.setHours(9, 15, 0);
  const finalTime = new Date();
  finalTime.setHours(15, 30, 0);

  var [date, setDate] = useState(new Date());

  const tdiff = (date - initialTime) / 60000;
  // console.log(~~tdiff);

  useEffect(() => {
    var timer = setInterval(() => {
      setDate(new Date()), 1000;
    });

    return function cleanup() {
      clearInterval(timer);
    };
  }, [date]);

  useEffect(() => {
    {
      console.log(marketData);
      marketData.marketStatus
        ? setMktStatus(marketData.marketStatus.marketState[0].marketStatus)
        : null;
    }
  }, [marketData]);

  return (
    <Card fullWidth={true} className="h-full">
      <CardBody className="flex flex-row items-center content-center">
        <div className="flex w-40 justify-center text-xs">
          <DaynightDisplay />
        </div>
        <div className="flex w-full ">
          <Progress
            className="flex mx-3 "
            label={
              <Clock
                format={"HH:mm"}
                noSsr={true}
                ticking={true}
                timezone={"Asia/Calcutta"}
              />
            }
            size="sm"
            value={tdiff}
            maxValue={375}
            color="warning"
            formatOptions={Date}
            showValueLabel={false}
          />
        </div>
        <div className="flex w-40 justify-center">
          <div className="m-2">{mktStatus}</div>
          <div className="m-2 self-center">
            {mktStatus != "Open" ? (
              <Image
                className="invert-[.5]"
                src={"/period1.png"}
                width={15}
                height={15}
              />
            ) : (
              <Image src={"/period1.png"} width={15} height={15} />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Timeline;
