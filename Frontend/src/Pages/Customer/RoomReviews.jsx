import ReviewsSection from "../../Components/Reviews/ReviewsSection";
import useAddReview from "../../Hooks/Review/useAddReview";

const RoomReviews = () => {
  const { mutateAsync } = useAddReview();

  const handleSubmitReview = async (data) => {
    try {
      await mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ReviewsSection
      title="Room Reviews"
      subtitle="What our guests think about this room"
      reviews={[]} 
      averageRating={0}
      totalReviews={0}
      ratingBreakdown={[]}
      roomName="Executive Suite"
      onSubmitReview={handleSubmitReview}
    />
  );
};

export default RoomReviews;