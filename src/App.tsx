import { RouterProvider } from "react-router"
import { routes } from "./Router/route"

export function App() {
  return <RouterProvider router={routes} />
}

export default App
