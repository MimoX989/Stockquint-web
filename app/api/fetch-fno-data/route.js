import { NextResponse } from "next/server";
import niftyData from "@/public/nifty.json";
export async function POST(req, res) {
  const sym = await req.json();
  try {
    // const result = await fetch(
    //   `https://www.nseindia.com/api/option-chain-indices?symbol=` + sym.symbol
    // );

    const data = await niftyData;
    // console.log({ data });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function saveData(sym, datax) {
  var strikeArray = new Array();
  const records = datax.records.data;
  // const timestamp = datax.records.timestamp;
  const uvalue = datax.records.underlyingValue;
  const atm = Math.round(uvalue / 50, 0) * 50;
  // const supabase = createServerComponentClient();
  let selectedexpiry = null;

  if (sym.selExp == null || sym.selExp === "") {
    selectedexpiry = datax.records.expiryDates[0];
  } else {
    selectedexpiry = sym.selExp;
  }
  console.log(selectedexpiry);
  records.forEach((e, index) => {
    if (
      e.expiryDate === selectedexpiry &&
      e.strikePrice >= atm - 200 &&
      e.strikePrice <= atm + 200
    ) {
      strikeArray.push(
        e.strikePrice,
        e.expiryDate,
        e.CE.openInterest,
        e.CE.changeinOpenInterest,
        e.CE.totalTradedVolume,
        e.CE.impliedVolatility,
        e.CE.lastPrice,
        e.PE.openInterest,
        e.PE.changeinOpenInterest,
        e.PE.totalTradedVolume,
        e.PE.impliedVolatility,
        e.PE.lastPrice
      );
      // console.log(strikeArray);
    }
  });

  console.log(strikeArray);
}

// >>>>>>>>>>>>>>

// const { data, error } = await supabase
//   .from("fno_datatable")
//   .upsert([
//     {
//       symbol: `${sym}`,
//       expiry: `08-Mar-2024`,
//       ce_oi: `78`,
//       ceoi_chg: `67`,
//       ce_ttv: "65",
//       ce_ltv: "456",
//       ce_mv: "45",
//       pe_oi: "564",
//       peoi_chg: "456",
//       pe_ttv: "456",
//       pe_ltv: "45",
//       pe_mv: "45",
//     },
//   ])
//   .select();

// console.log(data);
// console.log(error);
// }
