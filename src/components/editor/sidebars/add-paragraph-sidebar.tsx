import React from "react";
import { LabelInput } from "@/components/ui/label-input";
import {
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { v4 } from "uuid";
import { debounce, get } from "lodash";

export type AddParagraphSidebarProps = {
  label?: string;
};

export const AddParagraphSidebar = ({ label }: AddParagraphSidebarProps) => {
  // state
  const [text, setText] = React.useState<string>("");
  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  const videoData = get(editorWidgetState, "data", { id: 0, text: "" });

  React.useEffect(() => {
    if (videoData && videoData.text) {
      setText(videoData.text);
    }
  }, [videoData]);

  const handleOnChange = React.useCallback(
    debounce((value: string) => {
      const currentVideoId = get(editorWidgetState, "data.id", null);
      const getId = currentVideoId ? currentVideoId : v4();
      const data = {
        id: getId,
        text: value,
      };
      editorObs$.updateWidget(currentWidgetState.widgetId, {
        ...editorWidgetState,
        data: data,
      });
    }, 1500),
    [editorObs$, editorWidgetState, currentWidgetState]
  );

  return (
    <>
      {/** divider line */}
      <div className="flex h-[0.5px] w-full bg-gray-300 mb-2" />

      {editorWidgetState && (
        <>
          <div className="flex flex-col mb-4">
            <LabelInput
              label={label || "Video Source"}
              placeholder=""
              value={text || ""}
              onChange={(value: any) => {
                setText(value);
                handleOnChange(value);
              }}
            />
          </div>
        </>
      )}
    </>
  );
};
