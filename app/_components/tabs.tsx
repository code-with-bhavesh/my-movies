"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { ReactElement } from "react";

interface Options {
  label: string;
  value: string | number;
  desc: string | number | ReactElement;
}

interface Props {
  value: string | number;
  options: Options[];
  setTabValue: Function;
}

export default function TabsComponent(props: Props) {
  const { options, value, setTabValue } = props;

  return (
    <Tabs value={value}>
      <TabsHeader placeholder={""}>
        {options.map(({ label, value }) => (
          <Tab
            placeholder={""}
            key={value}
            value={value}
            onClick={() => setTabValue(value)}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody placeholder={""}>
        {options.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
