import React, { useState } from "react";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { IconButton, Button } from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { LabelInput } from "@/components/ui/label-input";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";
import { PageTypes } from "@/types/editor.types";
import { get } from "lodash";

export const AddTabNames = () => {
  const [formData, setFormData] = useState([{ key: "", value: "" }]);

  const editorObs$ = useEditorObserveable();
  const currentPage$ = useCurrentPageObserveable();
  const pages$ = useEditorPagesObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  /// current pageInfo;
  const currentPageInfo$ = React.useMemo(() => {
    if (currentPage$.pageId) {
      return pages$[currentPage$.pageId];
    }
    return {} as unknown as PageTypes;
  }, [currentPage$, pages$]);

  const tabNames = React.useMemo(() => {
    const names = currentPageInfo$.tabs?.map((tab) => {
      return tab.name;
    });
    return names;
  }, [currentPageInfo$]);

  const isTabView = get(currentPageInfo$, "isTabView", false);
  const hasTabs = currentPageInfo$.tabs && currentPageInfo$.tabs.length > 0;

  React.useEffect(() => {
    const data = editorWidgetState?.data || [{ key: "", value: "" }];
    setFormData(data as unknown as any);
  }, [editorWidgetState]);

  const handleChange = (index: any, key: string, value: string) => {
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [key]: value };
    setFormData(newFormData);
  };

  const addPair = () => {
    setFormData([...formData, { key: "", value: "" }]);
  };

  const removePair = (index: number) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const render = () => {
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      data: [...formData],
    });
  };

  return (
    <div className="max-h-72 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-900">
      {hasTabs && tabNames && tabNames.length > 0 && (
        <>
          {tabNames.map((name, index) => (
            <div key={index} className="flex flex-col mb-4">
              <span>{name}</span>
            </div>
          ))}
        </>
      )}
      {formData.map((pair, index) => (
        <div key={index} className="flex flex-col mb-4">
          <LabelInput
            label="Key"
            placeholder=""
            value={pair.key}
            onChange={(value: any) => handleChange(index, "key", value)}
          />

          <div className="flex my-2 gap-2">
            <Button
              variant="outlined"
              size="sm"
              color="blue"
              className="inline-flex items-center gap-2"
              onClick={render}
            >
              Save
            </Button>

            <Button
              variant="outlined"
              size="sm"
              color="blue"
              className="inline-flex items-center gap-2"
              onClick={() => removePair(index)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ))}

      <div className="inline-flex overflow-hidden relative justify-between items-center gap-2 my-1 border-dotted border-2 border-gray-300 px-1">
        <Button
          variant="text"
          size="sm"
          color="blue"
          className="inline-flex items-center gap-2 text-xs px-0"
          onClick={addPair}
        >
          Add Tab
        </Button>
      </div>
    </div>
  );
};
