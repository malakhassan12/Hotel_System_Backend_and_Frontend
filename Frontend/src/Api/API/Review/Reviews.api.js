import reviewClient from "../../Client/Review/Review.client";

// Malak
export const addReview = async (data) => {
  const res = await reviewClient.post("/add", data);

  return res?.data;
};

export const deleteReview = async (reviewId) => {
  const res = await reviewClient.delete(`/delete/${reviewId}`);

  return res?.data;
};

export const editReview = async ({ reviewId, rating, comment }) => {
const res = await reviewClient.put(`/update/${reviewId}`, {}, {
    params: {
      rating: rating,
      comment: comment,
    },
  });
  return res?.data;
};


// --------------------------------------------
export const getReviewsByUserId = async (userId) => {
  try {
    const res = await reviewClient.get(`/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const getAvgRatingForRoom = async (roomId) => {
  try {
    const res = await reviewClient.get(`/average/${roomId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching average rating:", error);
    throw error;
  }
};
