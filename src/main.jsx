import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
  
} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </HelmetProvider>
    </QueryClientProvider>
  </AuthProvider>
);
