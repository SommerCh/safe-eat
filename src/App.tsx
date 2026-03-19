import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import { ProfileProvider } from "./app/context/ProfileContext";
import { Toaster } from "./app/components/ui/sonner";

function App() {
  return (
    <ProfileProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ProfileProvider>
  );
}

export default App;
