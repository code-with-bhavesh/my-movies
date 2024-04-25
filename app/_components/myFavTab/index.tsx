"use client";
import TabsComponent from "@/app/_components/tabs";
interface Props{
  setTabValue: Function
value: string | number
}

export default function TabsDefault(props: Props) {
  const data = [
    {
      label: "All",
      value: "all",
      desc: ``,
    },
    {
      label: "favorites list",
      value: "fav",
      desc: ``,
    },
  ];

  const {value, setTabValue} = props;

  return <TabsComponent value={value} options={data} setTabValue={setTabValue} />;
}
