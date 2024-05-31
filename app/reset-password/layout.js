import Image from "next/image";
import React, { useContext } from "react";

function ResetPasswordLayout({ children }) {
  return (
    <section className="h-screen">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 h-full m-2 justify-center items-center">
        <div className="p-5 flex flex-col justify-center items-center">
          <Image
            className="max-sm: w-3/4"
            src="/stock_prices.svg"
            alt="stock img"
            height={300}
            width={300}
            priority
          />
        </div>
        <div className="flex flex-col justify-center items-center h-3/4 ">
          {children}
        </div>
      </div>
    </section>
  );
}

export default ResetPasswordLayout;
