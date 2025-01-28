import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { HelmetProvider } from 'react-helmet-async';

import {

  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
<AuthProvider>
<HelmetProvider>
   <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
 </HelmetProvider>
</AuthProvider>
)
