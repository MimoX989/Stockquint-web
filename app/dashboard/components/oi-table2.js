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
        return items.strike == atm ? `bg-yellow-400 text-black text-center` : `text-center`;
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
      let CEside = () => {
        if (index == 0) {
          return total_ceoi;
        } else if (index == 4) {
          return total_cecoi;
        } else if (index == 5) {
          return total_cemv;
        }
      };

      let PEside = () => {
        if (index == 0) {
          return total_peoi;
        } else if (index == 4) {
          return total_pecoi;
        } else if (index == 5) {
          return total_pemv;
        }
      };

      let ConClu = () => {
        if (index == 0) {
          if (total_ceoi > total_peoi) return "OI: Call Writing";
          else return "OI: Put Writing";
        } else if (index == 4) {
          if (total_cecoi > total_pecoi) return "COI: Call Writing ";
          else return "COI: Put Writing";
        } else if (index == 5) {
          if (total_cemv > total_pemv) return "MV: Call Writing";
          else return "MV: Put Writing";
        }
      };

let styleCEside=()=>{
  if (index==0){
    if (total_ceoi > total_peoi) return `bg-red-800 border-1 text-center`;
    else return `border-1 text-center`;
  }else if (index ==4){
    if (total_cecoi > total_pecoi) return `bg-red-800 border-1 text-center`;
    else return `border-1 text-center`;
  }else if(index==5){
    if (total_cemv > total_pemv) return `bg-red-800 border-1 text-center`;
    else return `border-1 text-center`;
  }
}
let stylePEside=()=>{
  if (index==0){
    if (total_peoi > total_ceoi) return `bg-blue-700 border-1`;
    else return `border-1`;
  }else if (index ==4){
    if (total_pecoi > total_cecoi) return `bg-blue-700 border-1`;
    else return `border-1`;
  }else if(index==5){
    if (total_pemv > total_cemv) return `bg-blue-700 border-1`;
    else return `border-1`;
  }
}

      return (
        <TableRow key={items.strike}>
          <TableCell className="border-1">{items.ceoi}</TableCell>
          <TableCell className={styleCoiCE()}>{items.cecoi}</TableCell>
          <TableCell className={styleTtvCE()}>{items.cettv}</TableCell>
          <TableCell className={styleAtm()}>{items.strike}</TableCell>
          <TableCell className={styleTtvPE()}>{items.pettv}</TableCell>
          <TableCell className={styleCoiPE()}>{items.pecoi}</TableCell>
          <TableCell className="text-end border-1">{items.peoi}</TableCell>
          <TableCell
            rowSpan={index == 0 || index == 5 ? `4` : null}
            hidden={index == 0 || index == 4 || index == 5 ? false : true}
            className={styleCEside()}
          >
            {CEside()}
          </TableCell>
          <TableCell
            rowSpan={index == 0 || index == 5 ? `4` : null}
            hidden={index == 0 || index == 4 || index == 5 ? false : true}
            className={stylePEside()}
          >
            {PEside()}
          </TableCell>
          <TableCell
            rowSpan={index == 0 || index == 5 ? `4` : null}
            hidden={index == 0 || index == 4 || index == 5 ? false : true}
            className="border-1"
          >
            {ConClu()}
          </TableCell>
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
          <TableHeader className="border-1 p-1 text-amber-400 ">
            <TableColumn align="start">OI</TableColumn>
            <TableColumn align="start">OI Chg</TableColumn>
            <TableColumn align="start" className="text-wrap">
              Turnover Vol(Million)
            </TableColumn>
            <TableColumn align="center">Strike Price</TableColumn>
            <TableColumn align="end" className="text-wrap">
              Turnover Vol(Million)
            </TableColumn>
            <TableColumn align="end">OI Chg</TableColumn>
            <TableColumn align="end">OI</TableColumn>
            <TableColumn align="center">CE Change</TableColumn>
            <TableColumn align="center">PE Change</TableColumn>
            <TableColumn align="center">Status</TableColumn>
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
