"use client";

import React, { ReactElement, createContext, useEffect, useState } from "react";

interface Props {
  children: ReactElement;
}

interface LocalStorageData {
  movieId: (string | number)[];
}

export interface ContextData {
  data: LocalStorageData;
  addFavList: Function;
  removeFavList: Function;
}

const storageData = localStorage.getItem("favIds");

const localStorageData: LocalStorageData = storageData
  ? JSON.parse(storageData)
  : { movieId: [] };

const UserContext = createContext<ContextData>({
  data: localStorageData,
  addFavList: () => {},
  removeFavList: () => {},
});

const UserProvider = ({ children }: Props) => {
  const [data, setData] = useState<LocalStorageData>(localStorageData);

  useEffect(() => {
    localStorage.setItem("favIds", JSON.stringify(data));
  }, [data]);

  const addFavList = (id: number) => {
    setData({ movieId: [...data.movieId, id] });
  };

  const removeFavList = (id: number) => {
    setData({
      movieId: data.movieId.filter((eId: string | number) => eId !== id),
    });
  };

  return (
    <UserContext.Provider value={{ data, addFavList, removeFavList }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
