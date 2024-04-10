import React from "react";
import { EditorTargetsContainer } from "./editor-targets-container";
import ReactGridLayout from "react-grid-layout";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

type EditorTabPagesProps = {
  pageId: string;
  onLayoutChange: (layout: any) => void;
  allLayoutChange: (layouts: ReactGridLayout.Layouts) => void;
};

const data = [
  {
    label: "HTML",
    value: "html",
    desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
  },
  {
    label: "React",
    value: "react",
    desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
  },
];

export const EditorTabPages = ({
  pageId,
  onLayoutChange,
  allLayoutChange,
}: EditorTabPagesProps) => {
  // work on page data and then update editor targets container with page data;
  /// const pageData = pageConfigs.find((p) => p.pageIndex === page);
  return (
    <>
      {pageId && (
        <Tabs value="html">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      )}
    </>
  );
};
