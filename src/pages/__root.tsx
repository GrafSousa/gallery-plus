import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Box } from "../components/Box";
import { Header } from "../components/Header";

const RootLayout = () => (
  <NuqsAdapter>
    <Box className="mx-auto min-h-screen max-w-248 py-9">
      <Header />
      <Box as="main">
        <Outlet />
      </Box>
    </Box>
    <TanStackRouterDevtools />
  </NuqsAdapter>
);

export const Route = createRootRoute({ component: RootLayout });
