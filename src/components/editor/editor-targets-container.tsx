import React from "react";
import { useEditorPageWidgetsObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { map } from "lodash";
import { WidgetTypes, availableHandles } from "@/types/editor.types";
import GridLayout from "./gridlayout/resize-grid-layout";
import { useHoveredWidgetRepo, useObservable } from "@/store";

type EditorTargetsProps = {
  pageId: string;
  setRef: (el: HTMLDivElement) => void;
  onLayoutChange: (layout: any) => void;
};

export const EditorTargetsContainer = ({
  pageId,
  setRef,
  onLayoutChange,
}: EditorTargetsProps) => {
  const allWidgets = useEditorPageWidgetsObserveable(pageId);

  const layoutData = React.useMemo(() => {
    const widgetLayoutData = map(allWidgets, (widget: WidgetTypes) => {
      return {
        i: widget.id,
        x: widget.transformation.x,
        y: widget.transformation.y,
        w: widget.transformation.w,
        h: widget.transformation.h,
        resizeHandles: availableHandles,
      };
    });
    const gridlayoutsData = { lg: widgetLayoutData };
    return gridlayoutsData;
  }, [allWidgets]);

  const onDragStart = (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => {
    const { i: itemId } = layout;
    console.log("Dragging item ID:", itemId);
    console.log("onDragStart", {
      layout,
      oldItem,
      newItem,
      placeholder,
      e,
      element,
    });
  };

  const onResizeStart = (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => {
    console.log("onResizeStart", e.target);
  };

  const onHover = (widgetId: string) => {
    console.log("widgetId", widgetId);
  };

  return (
    <div className="flex flex-grow" ref={setRef}>
      <GridLayout
        data={layoutData}
        onLayoutChange={onLayoutChange}
        onDragStart={onDragStart}
        onResizeStart={onResizeStart}
        onHover={onHover}
      />
    </div>
  );
};
