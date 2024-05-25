"use client";
import { AppContext } from "@/app/utils/providers";
import { Button, Spinner } from "@nextui-org/react";
import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { InfinitySpin } from "react-loader-spinner";

function oiDataTable() {
  const [isLoading, setLoading] = useState(false);
  const ctxdata = useContext(AppContext);
  const [tabData, setTabData] = useState([]);
  const [expDate, setExpDate] = useState();
  const [uvalue, setUvalue] = useState();
  const [dataArray, setDataArray] = useState(null);

  useEffect(() => {
    if (ctxdata.symData.records) {
      setExpDate(ctxdata.symData.records.expiryDates[0]);
      setUvalue(ctxdata.symData.records.underlyingValue);
      setTabData(ctxdata.symData.records.data);
      setDataArray(loadData(tabData));
    }
  }, [ctxdata.symData]);

  function loadData(data) {
    setLoading(true);
    var strikeArray = new Array();
    const atm = Math.round(uvalue / 50, 0) * 50;
    console.log(expDate);
    data.forEach((e, index) => {
      if (
        e.expiryDate === expDate &&
        e.strikePrice >= atm - 200 &&
        e.strikePrice <= atm + 200
      ) {
        strikeArray.push({
          strike: e.strikePrice,
          expiry: e.expiryDate,
          ceoi: e.CE.openInterest,
          cecoi: e.CE.changeinOpenInterest,
          cettv: e.CE.totalTradedVolume,
          ceiv: e.CE.impliedVolatility,
          celtv: e.CE.lastPrice,
          peoi: e.PE.openInterest,
          pecoi: e.PE.changeinOpenInterest,
          pettv: e.PE.totalTradedVolume,
          peiv: e.PE.impliedVolatility,
          peiv: e.PE.lastPrice,
        });
        // console.log(strikeArray);
      }
    });
    setLoading(false);
    return strikeArray.map((items) => {
      console.log(items);
      let largest = 0;
      let scndlargest = 0;
      let styleAtm = "";
      const max_cettv = (items)=>{
        Math.max.apply(null,list.map((o)=>{return o.cettv}))
      }
     
     
      return (
        <tr key={items.strike}>
          {(styleAtm = () => {
            return items.strike == atm ? `bg-yellow-400 text-black` : ``;
          })}

          <td className="border-1">{items.ceoi}</td>
          <td className="border-1">{items.cecoi}</td>
          <td className="border-1">{items.cettv}</td>
          <td className={styleAtm()}>{items.strike}</td>
          <td className="border-1">{items.pettv}</td>
          <td className="border-1">{items.pecoi}</td>
          <td className="border-1">{items.peoi}</td>
          <td className="border-1"></td>
          <td className="border-1"></td>
          <td className="border-1"></td>
        </tr>
      );
    });
  }

  return (
    <div className="overflow-auto w-full m-4" id="table_component">
      {isLoading == true ? (
        <div className={"flex my-8 h-48 w-full items-center justify-center"}>
          {" "}
          <InfinitySpin width="200" height="200" />
        </div>
      ) : (
        <table className="border-1 border-solid text-center border-spacing-1 table-fixed w-full h-full">
          <caption className="caption-top text-left">Table 1</caption>
          <thead className="border-1 p-1 text-sm text-amber-400 ">
            <tr>
              <th>OI</th>
              <th>OI Chg</th>
              <th>Turnover Vol(Million)</th>
              <th>Strike Price</th>
              <th>Turnover Vol(Million)</th>
              <th>OI Chg</th>
              <th>OI</th>
              <th>CE Change</th>
              <th>PE Change</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataArray}
            {/* {dataArray.map((items, index) => {
              <tr key={items}>
                {<td>{items.strike}</td>}
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>;
            })} */}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default oiDataTable;
