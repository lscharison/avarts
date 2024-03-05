"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { DocumentTypes } from "@/types/editor.types";
import { DynamicPdfViewer } from "./dynamic-pdf-viewer";

export type DialogViewWorkBookProps = {
  open: boolean;
  handler: () => void;
  selectedDocument: DocumentTypes;
};

export const DialogViewPdf = ({
  open,
  handler,
  selectedDocument,
}: DialogViewWorkBookProps) => {
  return (
    <Dialog size={"lg"} open={open} handler={handler} className="h-full">
      <DialogHeader className="flex flex-row justify-between gap-2">
        <Typography variant="h6">{selectedDocument.name}</Typography>
        <IconButton variant="text" size="sm" onClick={handler}>
          <XCircleIcon className="h-6 w-6 text-blue-gray" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="h-[80%]">
        <DynamicPdfViewer file={selectedDocument.url} />
      </DialogBody>
    </Dialog>
  );
};
