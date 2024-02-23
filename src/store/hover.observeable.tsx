import { WidgetElement, WidgetEnum } from "@/types";
import { BehaviorSubject } from "rxjs";

export interface IHoverWidgetState {
  pageId: string;
  widgetId: string;
  widgetElement: WidgetElement | null;
}

const initialState = {
  widgetId: "",
  pageId: "",
  widgetElement: null,
};

const selectedSubject = new BehaviorSubject<IHoverWidgetState>(initialState);

export const useHoveredWidgetRepo = () => {
  const set = (
    widgetId: string,
    pageId: string,
    widgetElement: WidgetElement | null
  ) => {
    const state = selectedSubject.getValue();
    selectedSubject.next({
      ...state,
      widgetId,
      pageId,
      ...(widgetElement && { widgetElement }),
    });
  };

  const updateWidgetType = (widgetElement: WidgetElement) => {
    const state = selectedSubject.getValue();
    selectedSubject.next({ ...state, widgetElement });
  };

  const unSelect = () => {
    selectedSubject.next(initialState);
  };

  const getObservable = () => {
    return selectedSubject;
  };

  return {
    set,
    unSelect,
    getObservable,
    updateWidgetType,
  };
};
