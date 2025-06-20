import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"], // needs to be an array
    queryFn: getBookings,
  });

  return { isLoading, bookings, error };
}
