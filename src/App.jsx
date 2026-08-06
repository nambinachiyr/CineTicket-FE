import { Children, useContext, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/user/Home"
import MainLayOut from "./pages/user/MainLayOut"
import Login from "./pages/user/Login"
import Signup from "./pages/user/Signup"
import { Toaster } from 'react-hot-toast'
import MovieDetails from "./pages/user/MovieDetails"
import TheaterInMovie from "./pages/user/TheaterInMovie"
import ShowLoader from "../src/loaders/user/Show"
import SeatLayOut from "./pages/user/SeatLayOut"
import { contextValue } from "./contextvaluses/ContextValue"
import authInstance from "./axioInstances/user/authInstances"
import BookingSuccess from "./pages/user/BookingSuccess"
import singleBookingLoader from "./loaders/user/SingleBooking"
import LoadSpinContent from "./components/user/LoadSpinContent"
import SingleBookingTicket from "./pages/user/SingleBookingTicket"
import LogInTA from "./pages/theaterAdmin/LogInTA"
import HomeTA from "./pages/theaterAdmin/HomeTA"
import Screen from "./pages/theaterAdmin/Screen"
import screens from "./loaders/theaterAdmin/Screens"
import Show from "./pages/theaterAdmin/Show"
import Allshows from "./loaders/theaterAdmin/AllShows"
import Theater from "./pages/theaterAdmin/Theater"
import theaterLoader from "./loaders/theaterAdmin/Theaterget"
import AddNewScreen from "./pages/theaterAdmin/AddNewScreen"
import AddNewShow from "./pages/theaterAdmin/AddNewShow"

const routes = [
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "movie/:id",
        element: <MovieDetails />
      },
      {
        path: "theaters_shows/:id",
        element: <TheaterInMovie />,
        loader: ShowLoader,
        hydrateFallbackElement: <LoadSpinContent />
      },
      {
        path: ":showid/:showDate/:showTime",
        element: <SeatLayOut />
      },
      {
        path: 'booking-success/:id',
        element: <BookingSuccess />,
        loader: singleBookingLoader,
        hydrateFallbackElement: <LoadSpinContent />
      },
      {
        path: "bookingdetail/:id",
        element: <SingleBookingTicket />,
        loader: singleBookingLoader,
        hydrateFallbackElement: <LoadSpinContent />
      }
    ]
  },
  {
    path: "/theater-admin",
    children: [
      {
        path: "login",
        element: <LogInTA />
      },
      {
        path: "dashboard",
        element: <HomeTA />
      },
      {
        path: "theater",
        element: <Theater />,
        loader: theaterLoader,
        hydrateFallbackElement: <LoadSpinContent />

      },
      {
        path: "screens",
        element: <Screen />,
        loader: screens,
        hydrateFallbackElement: <LoadSpinContent />
      },
      {
        path: "shows",
        element: <Show />,
        loader: Allshows,
        hydrateFallbackElement: <LoadSpinContent />
      },
      {
        path: "addscreen",
        element: <AddNewScreen />
      },
      {
        path:'addshow',
        element:<AddNewShow/>
      }
    ]
  }
]
const router = createBrowserRouter(routes)


const App = () => {
  const {   contextUser, setContextUser } = useContext(contextValue)

  return (<>
    <RouterProvider router={router}></RouterProvider>
    <Toaster position="top-right" />
  </>
  )
}

export default App

