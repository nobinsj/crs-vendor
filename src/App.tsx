import { RouterProvider } from "react-router"
import { router } from "./Router/route"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Bounce, Slide, ToastContainer } from "react-toastify"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={1500}
        hideProgressBar
        position="top-center"
        transition={Slide}
        closeButton={false}
      />
    </QueryClientProvider>
  )
}

export default App
