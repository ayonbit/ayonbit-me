"use client";

import dynamic from "next/dynamic";

const PortfolioCard = dynamic(() => import("./PortfolioCard"), {
  ssr: false,
});

const PortfolioClient = () => {
  return <PortfolioCard />;
};

export default PortfolioClient;
