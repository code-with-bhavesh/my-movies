"use client";
import MovieCard from "@/app/_components/movieCard";
import Tabs from "@/app/_components/myFavTab";
import { KeyboardEventHandler, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";
import { useQuery, useMutation } from "react-query";
import { CiSearch } from "react-icons/ci";
import { Spinner } from "@material-tailwind/react";
import { CgDanger } from "react-icons/cg";
import { UserContext, ContextData } from "@/app/_utils/context";
export interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

const fetchData = async (page?: number, search?: string) => {
  const response = await axios.get(
    `http://localhost:3000/api/movies?${page ? `page=${page}` : ""}${
      search ? `&search=${search}` : ""
    }`,
    {
      headers: {
        token: "test_token",
      },
    }
  );
  const data = await response.data;
  return data.data;
};

const getFavoriteData = async (ids: (number | string)[]) => {
  const response = await axios.post(
    "http://localhost:3000/api/movies",
    { ids },
    {
      headers: {
        token: "test_token",
      },
    }
  );
  const data = await response.data;
  return data;
};

export default function MoviesListPage() {
  const { data }: ContextData = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);
  const [favList, setFavList] = useState([]);

  const {
    data: movieList,
    error,
    isLoading,
  } = useQuery(
    ["movieList", page, searchTerm],
    () => fetchData(page, searchTerm),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [tabValue, setTabValue] = useState("all");

  const mutation = useMutation(getFavoriteData, {
    onSuccess: (res) => {
      setFavList(res.data);
    },
  });

  useEffect(() => {
    if (tabValue === "fav") {
      mutation.mutate(data?.movieId || []);
    }
  }, [tabValue]);

  const handleSearch = (e: any) => {
    setPage(1);
    setSearchTerm(e.target.value);
  };

  

  if (isLoading) {
    return <Spinner className="h-24 w-24 absolute left-[50%] top-[50%]" />;
  }

  if (error) {
    return <div className=" absolute left-[50%] top-[50%]"><CgDanger color="#c12222" size={100} /></div>;
  }

  return (
    <main>
      <div className=" flex justify-between w-full  mt-6 mb-4 px-56">
        <div className="w-72">
          <Tabs setTabValue={setTabValue} value={tabValue} />
        </div>
        <div className="w-72">
          <Input
            label="Search"
            placeholder="Search by movie title..."
            crossOrigin={Input}
            icon={<CiSearch />}
            className="bg-white"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
      </div>
      <div className="flex p-4 flex-wrap justify-center">
        {tabValue === "all"
          ? movieList.results.map((val: Movie, i: number) =>
              val ? (
                <MovieCard
                  movie={val}
                  key={i}
                  className="m-4 w-96 min-w-[500px] mb-12 transition-all duration-[0.2s] ease-[ease-in-out] hover:shadow-[0_4px_31px_5px_rgba(0,0,0,0.3)]"
                />
              ) : (
                ""
              )
            )
          : favList.map((val: Movie, i: number) =>
              val ? (
                <MovieCard
                  movie={val}
                  key={i}
                  className="m-4 w-96 min-w-[500px] mb-12 transition-all duration-[0.2s] ease-[ease-in-out] hover:shadow-[0_4px_31px_5px_rgba(0,0,0,0.3)]"
                />
              ) : (
                ""
              )
            )}
      </div>
      <div className="absolute left-[50%] pb-[50px]">
        <Button size="lg" placeholder={""} onClick={() => setPage(page + 1)}>
          Go Next
        </Button>
      </div>
    </main>
  );
}
