"use client";
import { Typography, Button } from "@material-tailwind/react";
import CardComponent from "@/app/_components/card";
import DrawerComponent from "@/app/_components/drawer";
import { Movie } from "@/app/page";

import StartComponent from "@/app/_components/starComponent"

interface Props {
  open: boolean;
  onClose: () => void;
  movie: Movie;
}

export default function MovieCard(props: Props) {
  const { open, onClose,  movie } = props;
  return (
    <DrawerComponent
      open={open}
      onClose={onClose}
      title={""}
      placement={"right"}
      size={800}
    >
      <CardComponent
        className={""}
        imageUrl={
          `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
        }
        footer={<Button onClick={onClose} placeholder={""}>Close</Button>}
      >
        <div>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            {movie.title}
          </Typography>
          <StartComponent rating={movie.vote_average || 0} />
          <Typography placeholder={""}>
          {movie.overview}
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Average Vote: {movie?.vote_average} / 10
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Relase Date: {movie.release_date}
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Adult Movie: {movie.adult ? "Yes" : "No"}
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Original Language: {movie.original_language}
          </Typography>
          
        </div>
      </CardComponent>
    </DrawerComponent>
  );
}
