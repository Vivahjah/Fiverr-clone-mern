import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Homepage from "./Pages/home/Homepage"
import "./App.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import MyGigs from "./Pages/mygigs/MyGigs";
import Messages from "./Pages/messages/Messages";
import Orders from "./Pages/orders/Orders"
import Gig from  "./Pages/gig/Gig"
import Gigs from  "./Pages/gigs/Gigs"
import Message from "./Pages/message/Message"
import Add from "./Pages/add/Add";
function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children : [
        {
          path : "/",
          element : <Homepage />
        },
        {
          path : "/orders",
          element : <Orders />
        },
        {
          path : "/gig/:id",
          element : <Gig />
        },
        {
          path : "/gigs",
          element : <Gigs />
        },
        {
          path : "/mygigs",
          element : <MyGigs />
        },
        {
          path : "/add",
          element : <Add />
        },
        {
          path : "/message",
          element : <Message />
        },
        {
          path : "/messages",
          element : <Messages />
        }
      ]
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
