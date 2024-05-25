import { AppContext } from "@/app/utils/providers";
import { Button } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";

function ExpiryList() {
  const symbolData = useContext(AppContext);
  const [exp, setExp] = useState([]);

  useEffect(() => {
    if (symbolData.symData.records) {
      setExp(symbolData.symData.records.expiryDates);
    } else {
      setExp([]);
    }
  }, [symbolData.symData]);
  // useEffect(() => {
  //   setExp(symbolData.symData.records.expiryDates);
  // }, [symbolData.symData.records.expiryDates]);

  return (
    <div>
      {" "}
      <div className="flex items-center min-h-14">
        <p>Expiries: </p>
        <ul className="flex overflow-x-auto">
          {exp.slice(0, 4).map((index) => (
            <li className="p-0 m-2" key={index}>
              <div className="">
                {" "}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    symbolData.setSelectExp(index);
                  }}
                >
                  {index}
                </Button>{" "}
              </div>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpiryList;
