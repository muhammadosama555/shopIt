import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  // The number of stars to display
  const starCount = 5;

  const handleStarClick = (clickedStar) => {
    onRatingChange(clickedStar);
  };

  return (
    <div className="star-rating">
      {[...Array(starCount)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        return (
          <span
            key={index}
            className={`fa${isFilled ? 's' : 'r'} fa-star text-yellow-500 cursor-pointer`}
            onClick={() => handleStarClick(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
