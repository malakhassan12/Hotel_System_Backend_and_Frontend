import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51TLgf0RQlhJOgTMmoejEjhDvc6X3NN9QWT3nqY2aKBhVs24t535hR3VSmkyIuR4qZpOpIxgjuWIY8Fu79NlqgFEn00PVZ4oO4N"
);