"use client";
import dynamic from "next/dynamic";

export const DynamicPdfViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
});
