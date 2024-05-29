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
      let styleAtm = "";
      let styleTtvCE = "";
      let styleTtvPE = "";
      let styleCoiCE = "";
      let styleCoiPE = "";

      return (
        <TableRow>
          {
            (styleAtm = () => {
              return items.strike == atm ? `bg-yellow-400 text-black` : ``;
            })
          }
          {
            (styleTtvCE = () => {
              if (items.cettv == cettv1) {
                return `bg-red-800 border-1`;
              } else if (items.cettv == cettv2) {
                return `bg-red-500 border-1`;
              } else {
                return `border-1`;
              }
            })
          }
          {
            (styleCoiCE = () => {
              if (items.cecoi == cecoi1) {
                return `bg-red-800 border-1`;
              } else if (items.cecoi == cecoi2) {
                return `bg-red-500 border-1`;
              } else {
                return `border-1`;
              }
            })
          }
          {
            (styleCoiPE = () => {
              if (items.pecoi == pecoi1) {
                return `bg-blue-700 border-1`;
              } else if (items.pecoi == pecoi2) {
                return `bg-blue-400 border-1`;
              } else {
                return `border-1`;
              }
            })
          }
          {
            (styleTtvPE = () => {
              if (items.pettv == pettv1) {
                return `bg-blue-700 border-1`;
              } else if (items.pettv == pettv2) {
                return `bg-blue-400 border-1`;
              } else {
                return `border-1`;
              }
            })
          }
          <TableCell className="border-1">{items.ceoi}</TableCell>
          <TableCell className={styleCoiCE()}>{items.cecoi}</TableCell>
          <TableCell className={styleTtvCE()}>{items.cettv}</TableCell>
          <TableCell className={styleAtm()}>{items.strike}</TableCell>
          <TableCell className={styleTtvPE()}>{items.pettv}</TableCell>
          <TableCell className={styleCoiPE()}>{items.pecoi}</TableCell>
          <TableCell className="border-1">{items.peoi}</TableCell>
          {() => {
            if (index == 0) {
              return `<TableCell className="border-1"></TableCell>
              <TableCell className="border-1"></TableCell>
              <TableCell className="border-1"></TableCell>`;
            }
          }}
        </TableRow>
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
        <Table fullWidth layout="fixed">
          <TableHeader className="border-1 p-1 text-sm text-amber-400 ">
            <TableColumn>OI</TableColumn>
            <TableColumn>OI Chg</TableColumn>
            <TableColumn className="text-wrap">
              Turnover Vol(Million)
            </TableColumn>
            <TableColumn>Strike Price</TableColumn>
            <TableColumn className="text-wrap">
              Turnover Vol(Million)
            </TableColumn>
            <TableColumn>OI Chg</TableColumn>
            <TableColumn>OI</TableColumn>
            <TableColumn>CE Change</TableColumn>
            <TableColumn>PE Change</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {dataArray}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default oiDataTable2;
