import React, { useContext } from "react";
import Timeline from "../cards/timeline";
import Indices from "../cards/indices";
import Stockchart from "../cards/stockchart";
// import TradingViewWidget from "../components/tradingview-widget";
// import TradingViewWatchlist from "../components/tradingview-watchlist";
import Watchlist from "../cards/watchlist";

function page() {
  return (
    <div className="grid grid-cols-6 grid-rows-9 gap-2 w-full">
      <div className="crd-holder col-span-6 row-span-1 row-start-1 h-full">
        <Timeline />
      </div>
      <div className="crd-holder col-span-2 row-start-2 row-span-4 h-full">
        <Indices />
      </div>
      <div className="crd-holder col-span-3 row-span-4 row-start-2 h-full">
        <Stockchart />
      </div>
      <div className="crd-holder row-span-2 col-start-6 row-start-2 h-full">
        {/* 4 */}
      </div>
      <div className="crd-holder row-span-2 col-start-6 row-start-4 h-full">
        {/* 5 */}
      </div>
      <div className="crd-holder col-span-2 row-span-full col-start-1 row-start-6"></div>
      <div className="crd-holder row-span-full col-start-3 col-span-6 row-start-6">
        <Watchlist />
      </div>
      {/* <div className="crd-holder col-span-1 row-span-full col-start-6 row-start-6">
        6
      </div> */}
    </div>
  );
}

export default page;
