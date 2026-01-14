import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/Header";
import { Box } from "../components/Box";

const RootLayout = () => (
  <>
    <Box className="mx-auto min-h-screen max-w-248 py-9">
      <Header />
      <Box as="main">
        <Outlet />
      </Box>
    </Box>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
