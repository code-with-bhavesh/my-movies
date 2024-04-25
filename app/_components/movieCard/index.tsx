"use client";
import { Typography, Button } from "@material-tailwind/react";
import CardComponent from "@/app/_components/card";
import React from "react";
import MovieDetails from "@/app/_components/movieDetails";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import LoginComponent from "@/app/_components/loginComponent";
import { UserContext, ContextData } from "@/app/_utils/context";
import { Movie } from "@/app/page";
import { useSession } from "next-auth/react";
import StartComponent from "@/app/_components/starComponent"
interface Props {
  className: string;
  movie: Movie;
}

export default function MovieCard(props: Props) {
  const { className, movie } = props;
  const { status } = useSession();
  const { data, removeFavList, addFavList }: ContextData =
    useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [openLogin, setOpenLogin] = React.useState(false);

  const openDrawerLogin = () => setOpenLogin(true);
  const closeDrawerLogin = () => setOpenLogin(false);

  return (
    <div>
      <CardComponent
        className={className}
        imageUrl={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        footer={
          <div className="flex items-center justify-between">
            <Button onClick={openDrawer} placeholder={""}>
              Read More
            </Button>
            <StartComponent rating={movie.vote_average || 0} />
            {data?.movieId.includes(movie.id || 0) ? (
              <FaHeart
                color="#f70000"
                size={36}
                className="cursor-pointer"
                onClick={() =>
                  status === "authenticated"
                    ? removeFavList(movie.id)
                    : openDrawerLogin()
                }
              />
            ) : (
              <FaRegHeart
                color="#f70000"
                size={36}
                className="cursor-pointer"
                onClick={() =>
                  status === "authenticated"
                    ? addFavList(movie.id)
                    : openDrawerLogin()
                }
              />
            )}
          </div>
        }
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
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Relase Date: {movie.release_date}
          </Typography>
          
          <i className="fas fa-heart" />
          <Typography placeholder={""} className="three-dots">{movie.overview}</Typography>
        </div>
      </CardComponent>
      <MovieDetails
        open={open}
        onClose={closeDrawer}
        movie={movie}
      />
      <LoginComponent open={openLogin} onClose={closeDrawerLogin} />
    </div>
  );
}
