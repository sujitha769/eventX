import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import OrganizerRegister from "./pages/OrganizerRegister";
import Events from "./pages/Events";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import EditEvent from "./pages/EditEvent";
import RegisterEvent from "./pages/RegisterEvent";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/organizer/register"
          element={<OrganizerRegister />}
        />

        <Route path="/events" element={<Events />} />

        <Route
          path="/organizer/dashboard"
          element={<OrganizerDashboard />}
        />

        <Route
          path="/create-event"
          element={<CreateEvent />}
        />

        <Route
          path="/my-events"
          element={<MyEvents />}
        />

        <Route
          path="/edit-event/:eventId"
          element={<EditEvent />}
        />

        <Route
          path="/register/:eventId"
          element={<RegisterEvent />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;