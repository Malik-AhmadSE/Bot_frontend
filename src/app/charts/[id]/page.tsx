'use client'
import React from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import Script from "next/script";
import { NavBar } from "../../../components/Locals/Navbar/nav";
import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from "../../../../public/static/charting_library/charting_library";
const symbol="BTCUSDT";
const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: symbol,
  interval: "1" as ResolutionString,
  library_path: "/static/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
  
  theme: "dark",
};

const TVChartContainer = dynamic(
  () =>
    import("@/components/TVChartContainer").then((mod) => mod.TVChartContainer),
  { ssr: false }
);

export default function Home() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  return (
    <>
    <NavBar />
    <div className="pt-28">
    <div className="w-full h-[50px] flex  gap-4 font-semibold ">
      <h2>{symbol}</h2>
      <div>
        <h3>Price</h3>
        <h4>63908</h4>
      </div>
    </div>
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        // strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isScriptReady && <TVChartContainer {...defaultWidgetProps} />}
      </div>
    </>
  );
}
