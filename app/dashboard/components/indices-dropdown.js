"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Image,
  Divider,
} from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa";
import { AppContext } from "@/app/utils/providers";

function IndicesDropdown(props) {
  const [symbol, setSymbol] = useState("NIFTY");
  const [isLoading, setIsLoading] = useState(false);
  const ctxData = useContext(AppContext);
  const [uVal, setuVal] = useState("--:--");
  const [timestamp, setTimestamp] = useState("--");

  const items = [
    {
      symbol: "NIFTY",
      label: "NIFTY 50",
    },
    {
      symbol: "BANKNIFTY",
      label: "NIFTY BANK",
    },
    {
      symbol: "FINNIFTY",
      label: "NIFTY FINANCE",
    },
    {
      symbol: "MIDCPNIFTY",
      label: "NIFTY MIDCAP",
    },
    {
      symbol: "NIFTY%20MIDSMALLCAP%20400",
      label: "NIFTY MIDSMALLCAP",
    },
  ];

  useEffect(() => {
    {
      if (ctxData.symData.records) {
        <>
          {setuVal(ctxData.symData.records.underlyingValue)};
          {setTimestamp(ctxData.symData.records.timestamp)};
        </>;
      }
    }
  }, [ctxData.symData]);

  useEffect(() => {
    getData();
  }, [ctxData.selectExp]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/fetch-fno-data", {
        method: "POST",
        body: JSON.stringify({ symbol: symbol, selExp: ctxData.selectExp }),
      });
      const data = await res.json();
      await ctxData.setSymData(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col py-4 gap-2 items-center justify-center">
        <form className="flex flex-col gap-2" action={getData}>
          <Dropdown backdrop="blur" className="w-full">
            <DropdownTrigger>
              <Button
                fullWidth={true}
                variant="bordered"
                color="grey"
                endContent={<FaChevronDown />}
              >
                {symbol}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dynamic Actions"
              items={items}
              onAction={(key) => {
                setSymbol(key);
              }}
            >
              {(item) => (
                <DropdownItem
                  key={item.symbol}
                  // color={item.symbol === "delete" ? "danger" : "default"}
                  // className={item.symbol === "delete" ? "text-danger" : ""}
                  variant="flat"
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <Button
            fullWidth
            isLoading={isLoading}
            type="submit"
            onSubmit={(key) => {}}
            className="flex"
            variant="bordered"
          >
            Go
          </Button>
        </form>
      </div>
      <div>
        <Divider />

        <div className="flex-col gap-2 my-4 w-full">
          <div className="flex justify-around text-xs">
            <Image
              alt="live-indicator"
              src={"/period1.png"}
              height={15}
              width={15}
            />
            <p className="text-slate-400 text-right">
              Last Updated: <p className="text-white text-right">{timestamp}</p>
            </p>
          </div>
          <div className="my-4">
            <p className="text-large text-pink-400">{symbol}</p>
            <p className="text-4xl">{uVal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndicesDropdown;
