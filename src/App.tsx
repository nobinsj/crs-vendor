import { RouterProvider } from "react-router"
import { router } from "./Router/route"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Slide, ToastContainer } from "react-toastify"
import { Provider } from "react-redux"
import store from "./redux/store"

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
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
