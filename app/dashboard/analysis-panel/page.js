"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import IndicesDropdown from "../components/indices-dropdown";
import OiDataTable2 from "../components/oi-table2";
import { AppContext } from "@/app/utils/providers";
import ExpiryList from "../components/expiry-list";

function page() {
  const symbolData = useContext(AppContext);
  const [spotvalue, setSpotValue] = useState("--");

  return (
    <div className="grid grid-cols-6 grid-rows-9 gap-4 w-full">
      <div className="crd-holder col-span-1 row-span-9 row-start-1 h-full">
        <IndicesDropdown />
      </div>
      <div className="crd-holder col-span-4 row-start-1 row-span-9 h-full">
        <ExpiryList />
        <Suspense fallback={<p>Loading...!</p>}>
          <OiDataTable2 />
        </Suspense>
      </div>
      <div className="crd-holder col-span-1 row-span-9 row-start-1 h-full"></div>
    </div>
  );
}

export default page;
