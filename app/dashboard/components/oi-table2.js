"use client";
import { AppContext } from "@/app/utils/providers";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

function oiDataTable2() {
  const [isLoading, setLoading] = useState(true);
  const ctxdata = useContext(AppContext);
  const [tabData, setTabData] = useState([]);
  const [expDate, setExpDate] = useState("");
  const [uvalue, setUvalue] = useState();
  const [dataArray, setDataArray] = useState(null);

  useEffect(() => {
    if (ctxdata.symData.records) {
      setExpDate(ctxdata.symData.records.expiryDates[0]);
      setUvalue(ctxdata.symData.records.underlyingValue);
      setTabData(ctxdata.symData.records.data);
      setDataArray(loadData(tabData));
    }
  }, [ctxdata]);

  function loadData(tabData) {
    setLoading(true);
    var cettv1 = 0;
    var cettv2 = 0;
    var pettv1 = 0;
    var pettv2 = 0;
    var cecoi1 = 0;
    var cecoi2 = 0;
    var pecoi1 = 0;
    var pecoi2 = 0;
    var total_ceoi = 0;
    var total_peoi = 0;
    var total_cecoi = 0;
    var total_pecoi = 0;
    var total_cemv = 0;
    var total_pemv = 0;

    var strikeArray = new Array();
    console.log({ expDate });
    const atm = Math.round(uvalue / 50, 0) * 50;
    tabData.forEach((e, index) => {
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
      }
      // console.log(e);
    });
    console.log(strikeArray);

    function minmax() {
      strikeArray.forEach((element) => {
        if (element.cettv > cettv1) {
          cettv2 = cettv1;
          cettv1 = element.cettv;
        }
        if (element.pettv > pettv1) {
          pettv2 = pettv1;
          pettv1 = element.pettv;
        }
        if (element.cecoi > cecoi1) {
          cecoi2 = cecoi1;
          cecoi1 = element.cecoi;
        }
        if (element.pecoi > pecoi1) {
          pecoi2 = pecoi1;
          pecoi1 = element.pecoi;
        }
        total_ceoi = total_ceoi + element.ceoi;
        total_peoi = total_peoi + element.peoi;
        total_cecoi = total_cecoi + element.cecoi;
        total_pecoi = total_pecoi + element.pecoi;
        total_cemv = total_cemv + element.cettv;
        total_pemv = total_pemv + element.pettv;
      });
      //   console.log(cettv1, cettv2);
    }
    minmax();

    setLoading(false);
    return strikeArray.map((items, index) => {
      let styleAtm = () => {
        return items.strike == atm ? `bg-yellow-400 text-black` : ``;
      };
      let styleTtvCE = () => {
        if (items.cettv == cettv1) {
          return `bg-red-800 border-1`;
        } else if (items.cettv == cettv2) {
          return `bg-red-500 border-1`;
        } else {
          return `border-1`;
        }
      };
      let styleTtvPE = () => {
        if (items.pettv == pettv1) {
          return `bg-blue-700 border-1`;
        } else if (items.pettv == pettv2) {
          return `bg-blue-400 border-1`;
        } else {
          return `border-1`;
        }
      };

      let styleCoiCE = () => {
        if (items.cecoi == cecoi1) {
          return `bg-red-800 border-1`;
        } else if (items.cecoi == cecoi2) {
          return `bg-red-500 border-1`;
        } else {
          return `border-1`;
        }
      };
      let styleCoiPE = () => {
        if (items.pecoi == pecoi1) {
          return `bg-blue-700 border-1`;
        } else if (items.pecoi == pecoi2) {
          return `bg-blue-400 border-1`;
        } else {
          return `border-1`;
        }
      };

      return (
        <tr>
          <td className="border-1">{items.ceoi}</td>
          <td className={styleCoiCE()}>{items.cecoi}</td>
          <td className={styleTtvCE()}>{items.cettv}</td>
          <td className={styleAtm()}>{items.strike}</td>
          <td className={styleTtvPE()}>{items.pettv}</td>
          <td className={styleCoiPE()}>{items.pecoi}</td>
          <td className="border-1">{items.peoi}</td>
          {index == 0 ? (
            <>
              <td
                rowSpan="4"
                className={
                  total_ceoi > total_peoi ? `bg-blue-500 border-1` : `border-1`
                }
              >
                {total_ceoi}
              </td>
              <td
                rowSpan="4"
                className={
                  total_peoi > total_ceoi ? `bg-red-700 border-1` : `border-1`
                }
              >
                {total_peoi}
              </td>
              <td rowSpan="4" className="border-1">
                {total_ceoi > total_peoi
                  ? "OI: Call Writing"
                  : "OI: Put Writing"}
              </td>
            </>
          ) : null}
          {index == 4 ? (
            <>
              <td
                className={
                  total_cecoi > total_pecoi
                    ? `bg-blue-500 border-1`
                    : `border-1`
                }
              >
                {total_cecoi}
              </td>
              <td
                className={
                  total_pecoi > total_cecoi ? `bg-red-700 border-1` : `border-1`
                }
              >
                {total_pecoi}
              </td>
              <td className="border-1">
                {total_cecoi > total_pecoi
                  ? "COI: Call Writing"
                  : "COI: Put Writing"}
              </td>
            </>
          ) : null}
          {index == 5 ? (
            <>
              <td
                rowSpan="4"
                className={
                  total_cemv > total_pemv ? `bg-blue-500 border-1` : `border-1`
                }
              >
                {total_cemv}
              </td>
              <td
                rowSpan="4"
                className={
                  total_pemv > total_cemv ? `bg-red-700 border-1` : `border-1`
                }
              >
                {total_pemv}
              </td>
              <td rowSpan="4" className="border-1">
                {total_cemv > total_pemv
                  ? "MV: Call Writing"
                  : "MV: Put Writing"}
              </td>
            </>
          ) : null}
          {/* <TableCell
            rowSpan={index == 0 || index == 5 ? 4 : null}
            className={
              items.strike == atm || index == 0 || index == 5 ? `border-1` : ``
            }
          ></TableCell>
          <TableCell
            rowSpan={index == 0 || index == 5 ? 4 : null}
            className={
              items.strike == atm || index == 0 || index == 5 ? `border-1` : ``
            }
          ></TableCell>
          <TableCell
            rowSpan={index == 0 || index == 5 ? 4 : null}
            className={
              items.strike == atm || index == 0 || index == 5 ? `border-1` : ``
            }
          ></TableCell> */}
        </tr>
      );
    });
  }

  return (
    <div className="overflow-auto w-full m-4" id="table_component">
      {isLoading == true ? (
        <div className={"flex my-8 h-48 w-full items-center justify-center"}>
          {/* <Spinner />; */}
          <InfinitySpin width="100" height="100" />
        </div>
      ) : (
        <table fullWidth layout="fixed">
          <thead className="border-1 p-1 text-amber-400 ">
            <th>OI</th>
            <th>OI Chg</th>
            <th className="text-wrap">Turnover Vol(Million)</th>
            <th>Strike Price</th>
            <th className="text-wrap">Turnover Vol(Million)</th>
            <th>OI Chg</th>
            <th>OI</th>
            <th>CE Change</th>
            <th>PE Change</th>
            <th>Status</th>
          </thead>
          <tbody className="text-center" emptyContent={"No rows to display."}>
            {dataArray}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default oiDataTable2;
