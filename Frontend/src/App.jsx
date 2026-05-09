import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import "aos/dist/aos.css";

import LoadingPage from "./Pages/LoadingPage/LoadingPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { roles } from "./Constants/ConstantsFromBack";
import useAuthStore from "./Store/authStore";
import ReviewsPerRoom from "./Pages/Room/ReviewsPerRoom";

// Lazy Loading for Public Pages
const NotFound = lazy(() => import("./Pages/NotFound"));
const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const Register = lazy(() => import("./Pages/Auth/Register/Register"));
const BrowseRooms = lazy(() => import("./Pages/Room/BrowseRooms"));
const Settings = lazy(() => import("./Pages/Settings"));
const Notifications = lazy(() => import("./Pages/Notifications"));
const Logout = lazy(() => import("./Pages/Auth/Logout/Logout"));

// Layout Pages
const CustomerLayout = lazy(() => import("./Layout/CustomerLayout"));
const ReceptionistLayout = lazy(() => import("./Layout/ReceptionistLayout"));
const AdminLayout = lazy(() => import("./Layout/AdminLayout"));

// Customer Pages
const BookRoom = lazy(() => import("./Pages/Customer/BookRoom"));
const Favourites = lazy(() => import("./Pages/Customer/Favourites"));
const MyBookings = lazy(() => import("./Pages/Customer/MyBookings"));
const RoomDetails = lazy(() => import("./Pages/Room/RoomDetails"));
// const CheckOut = lazy(() => import("./Pages/Customer/CheckOut"));
const CheckIn = lazy(() => import("./Pages/Customer/CheckIn"));
const RoomReviews = lazy(() => import("./Pages/Customer/RoomReviews"));
// Receptionist Pages
const ReceptionistDashBoard = lazy(
  () => import("./Pages/Receptionist/ReceptionistDashBoard"),
);
const BookingRequests = lazy(
  () => import("./Pages/Receptionist/BookingRequests"),
);
const RoomsManagement = lazy(
  () => import("./Pages/Receptionist/RoomsManagement"),
);
const CheckInManagement = lazy(
  () => import("./Pages/Receptionist/CheckInManagement"),
);
const CheckOutManagement = lazy(
  () => import("./Pages/Receptionist/CheckOutManagement"),
);

const CreatePayment = lazy(() => import("./Pages/Customer/CreatePayment"));

// Admin Pages
const AdminDashBoard = lazy(() => import("./Pages/Admin/AdminDashBoard"));
const ManageRooms = lazy(() => import("./Pages/Admin/ManageRooms"));
const ManageUsers = lazy(() => import("./Pages/Admin/ManageUsers"));
const Reviews = lazy(() => import("./Pages/Admin/Reviews"));
const SystemLogs = lazy(() => import("./Pages/Admin/SystemLogs"));
const ReviewsByAdmin = lazy(() => import("./Pages/Admin/ReviewsByAdmin"));

function App() {
  const { role } = useAuthStore();

  useEffect(() => {
    import("aos").then((aos) => {
      aos.init({ disable: "mobile", once: true, duration: 800 });
    });
  }, []);

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {/* ===================================== Customer ==================================  */}

          <Route element={<ProtectedRoute allowedRoles={[roles[1]]} />}>
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<BrowseRooms />} />

              <Route path="rooms">
                <Route path=":roomId" element={<RoomDetails />}></Route>
                <Route path="book-room/:roomId" element={<BookRoom />} />
              </Route>
              <Route
                path="create-payment/:roomId"
                element={<CreatePayment />}
              />
              <Route path="reviews" element={<RoomReviews />} />
              {/* <Route path="rooms/:roomId" element={<RoomDetails />} /> */}

              <Route path="favourites" element={<Favourites />} />

              <Route path="my-bookings" element={<MyBookings />} />
              {/* <Route path="check-out/:bookingId" element={<CheckOut />} /> */}
              <Route path="check-in/:bookingId" element={<CheckIn />} />
              {/* <Route path="check-in/:roomId" element={<CheckIn />} /> */}
              {/* <Route path="settings" element={<Settings />} /> */}
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>

          {/* ===================================== Receptionist ==================================  */}

          <Route element={<ProtectedRoute allowedRoles={[roles[2]]} />}>
            <Route path="/receptionist" element={<ReceptionistLayout />}>
              <Route index element={<ReceptionistDashBoard />} />
              <Route path="booking-requests" element={<BookingRequests />} />
              <Route path="rooms">
                <Route index element={<BrowseRooms />} />

                <Route path=":roomId" element={<RoomDetails />} />
              </Route>
              {/* <Route path="rooms/:roomId" element={<RoomDetails />} /> */}
              <Route path="room-management" element={<RoomsManagement />} />

              <Route path="check-management" element={<CheckInManagement />} />
              {/* <Route
                path="check-out-management"
                element={<CheckOutManagement />}
              /> */}
              {/* <Route path="settings" element={<Settings />} /> */}
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>

          {/* ===================================== Admin ==================================  */}

          <Route element={<ProtectedRoute allowedRoles={[roles[0]]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashBoard />} />

              <Route path="manage-users" element={<ManageUsers />} />

              <Route path="rooms">
                <Route index element={<BrowseRooms />} />
                <Route path="manage-rooms" element={<ManageRooms />} />
                <Route path=":roomId" element={<RoomDetails />} />
              </Route>

              <Route path="reviews" element={<ReviewsByAdmin />} />
              <Route path="reviews/:roomId" element={<ReviewsPerRoom />} />

              {/* <Route path="system-logs" element={<SystemLogs />} /> */}
              {/* <Route path="settings" element={<Settings />} /> */}
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>

          {/* Redirect based on user role */}
          <Route
            path="/"
            element={
              role ? (
                role === roles[0] ? (
                  <Navigate to="/admin" />
                ) : role === roles[2] ? (
                  <Navigate to="/receptionist" />
                ) : (
                  <Navigate to="/customer" />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
