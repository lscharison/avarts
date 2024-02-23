import React from "react";
import { EditorTargetsContainer } from "./editor-targets-container";

type EditorPagesProps = {
  pageId: string;
  setRef: (el: HTMLDivElement) => void;
  onLayoutChange: (layout: any) => void;
};

export const EditorPages = ({
  pageId,
  setRef,
  onLayoutChange,
}: EditorPagesProps) => {
  // work on page data and then update editor targets container with page data;
  /// const pageData = pageConfigs.find((p) => p.pageIndex === page);
  return (
    <>
      {pageId && (
        <EditorTargetsContainer
          setRef={setRef}
          pageId={pageId}
          onLayoutChange={onLayoutChange}
        />
      )}
    </>
  );
};
