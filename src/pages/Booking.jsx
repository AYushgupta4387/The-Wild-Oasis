import BookingDetail from "../features/bookings/BookingDetail";

function Booking() {
  return <BookingDetail />; // This ccomponent only renders the BookingDetail component as we keep the Booking component simple and focused on rendering the detail view. All the logic and UI for displaying the booking details is handled within the BookingDetail component which is in the features/bookings directory.
}

export default Booking;
