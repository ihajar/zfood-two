import React from 'react'
import ReactDOM from 'react-dom/client' 
import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      networkMode: 'always',
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  }
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
          <Toaster visibleToasts={1} position='bottom-right' richColors />
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
