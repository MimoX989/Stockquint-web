"use client";
import React from "react";
import { InfinitySpin, Triangle } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <InfinitySpin visible={true} height="100" width="100" color={"#4fa94d"} />
    </div>
  );
}

export default Loading;
