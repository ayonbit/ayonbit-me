"use client";

import { useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { Button } from "./ui/button";

const DownloadCvButton = () => {
  const downloadCvHandler = useCallback(() => {
    const cvFile = "/assets/Ayon_Bit_CV.txt";

    try {
      const link = document.createElement("a");
      link.href = cvFile;
      link.download = "Ayon_Bit_CV.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CV:", error);
      alert("There was an issue downloading the CV.");
    }
  }, []);

  return (
    <Button
      variant="outline"
      size="lg"
      className="uppercase flex items-center gap-2"
      onClick={downloadCvHandler}
      aria-label="Download CV"
    >
      <span>Download CV</span>
      <FiDownload className="text-xl" />
    </Button>
  );
};

export default DownloadCvButton;
