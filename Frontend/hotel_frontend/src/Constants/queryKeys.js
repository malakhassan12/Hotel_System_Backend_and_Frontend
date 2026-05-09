export const QUERY_KEYS = {
  ROOMS_BY_TYPE: (type) => ["rooms", "type", type],
  ROOMS_BY_FEATURE: (feature) => ["rooms", "feature", feature],
  REVIEWS_BY_USER: (userId) => ["reviews", "user", userId],
  ROOM_AVG_RATING: (roomId) => ["reviews", "average", roomId],
  BOOKINGS_HISTORY: (userId) => ["bookings", "history", userId],
};