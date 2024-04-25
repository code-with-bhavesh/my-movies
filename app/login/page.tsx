"use client";
import MovieCard from "@/app/_components/movieCard";
import NavBar from "@/app/_components/navBar";
import Tabs from "@/app/_components/myFavTab";
import { Input } from "@material-tailwind/react";
import { useState } from "react";

import { CiSearch } from "react-icons/ci";
import { useQuery } from "react-query";

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/api/movies", {
    headers: { token: "asdas" },
  });
  const data = await response.json();
  return data;
};

export default function Login() {
  const { data: data1, error, isLoading } = useQuery("myQueryKey", fetchData);
  console.log(data1);
  const [tabValue, setTabValue] = useState("all");

  return (
    <main>
      <NavBar />
      <div className="max-w-[300px] m-auto mt-12">
        <Tabs setTabValue={setTabValue} value={tabValue} />
      </div>

      <div className="w-56  ">
        <Input
          label="Search"
          placeholder="Search by movie title..."
          crossOrigin={Input}
          icon={<CiSearch />}
        />
      </div>
      <div className="flex p-4 flex-wrap justify-center">
        {tabValue === "all"
          ? [1, 2, 3, 1, 2, 3].map((val, i) => (
              <MovieCard key={i} className="m-4 w-96 min-w-[500px]" />
            ))
          : [1, 2, 3].map((val, i) => (
              <MovieCard key={i} className="m-4 w-96 min-w-[500px]" />
            ))}
      </div>
    </main>
  );
}
