import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import "./index.css";
import SetAvatar from "./pages/SetAvatar";



const router = createBrowserRouter([
	{
		path: "/",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/chat",
		element: <Chat />,
	},
	{
		path: "/setAvatar",
		element: <SetAvatar />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router}>
		
				<App />
			
		</RouterProvider>
	</React.StrictMode>
);
