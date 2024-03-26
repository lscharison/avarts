import React from "react";
import { RenderWidgetItem } from "./render-widget";
import { cn } from "@/lib/utils";

export const GridItemView = ({
  data,
  className,
  root,
  title,
  children,
  ...props
}: any) => {
  console.log("allGridItemviewProps", props);
  return (
    <div
      key={data.i}
      className={cn(
        "flex flex-col flex-grow border-gray-1 border-solid border-2",
        className
      )}
      data-widgetid={data.i}
      {...props}
    >
      <RenderWidgetItem id={data.i} />
    </div>
  );
};
