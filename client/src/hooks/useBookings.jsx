import React, { useContext, useEffect } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useRef } from "react";
import { useQuery } from "react-query";
import { allBookings } from "../utils/api";
import { useAuth0 } from "@auth0/auth0-react";
import dayjs from "dayjs";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allBookings",
    queryFn: () => allBookings(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({
        ...prev,
        bookings: data?.map((booking) => {
          booking.date = dayjs(booking.date).format("DD/MM/YYYY");
          return booking
        }),
      })),
    enabled: user != undefined,
    staleTime: 3000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useBookings;
