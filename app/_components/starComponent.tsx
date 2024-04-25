import React from "react";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";

interface StarComponentProps {
  rating: number;
}

const StarComponent: React.FC<StarComponentProps> = ({ rating }) => {
  const renderStars = () => {
    const roundedRating = Math.round(rating * 2) / 4; // Round to the nearest half
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      let starClass = <IoMdStar className="w-[24px] h-[24px]" />;

      if (i <= roundedRating) {
        starClass = <IoMdStar className="w-[24px] h-[24px] text-[red]" />;
      } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
        starClass = <IoMdStarHalf className="w-[24px] h-[24px] text-[red]" />; // Add half star color
      }

      stars.push(starClass);
    }

    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default StarComponent;
