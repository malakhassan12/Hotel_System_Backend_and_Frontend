import ReviewsSection from "../../Components/Reviews/ReviewsSection";
import { mockReviews, reviewStats } from "../../Constants/ReviewsConstants";

const Reviews = () => {
  const handleSubmitReview = (data) => {
    console.log("New Review from Admin (should not happen):", data);
    // Admin normally doesn't write reviews, but we kept the prop for reusability
  };

  return (
    <ReviewsSection
      title="All Customer Reviews"
      subtitle="Monitor and manage all guest reviews across the hotel"
      reviews={mockReviews}
      averageRating={reviewStats.averageRating}
      totalReviews={reviewStats.totalReviews}
      ratingBreakdown={reviewStats.ratingBreakdown}
      isAdmin={true}
      onSubmitReview={handleSubmitReview}
    />
  );
};

export default Reviews;