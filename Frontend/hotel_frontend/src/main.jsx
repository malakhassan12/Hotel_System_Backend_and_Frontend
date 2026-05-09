import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Mantine UI

import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { colorSchemeManager, resolver, Theme } from "./Themes/Theme.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { stripePromise } from "./Utils/Stripe/Stripe.js";
import { Elements } from "@stripe/react-stripe-js";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={Theme}
        colorSchemeManager={colorSchemeManager}
        // defaultColorScheme="dark" // هيبدأ Dark لو مفيش حاجة متسيفة
        cssVariablesResolver={resolver} // <--- السطر ده هو أهم حتة
      >
        <Notifications position="top-right" zIndex={1000}/>
        <Elements stripe={stripePromise}>

        <App />
        </Elements>
      </MantineProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
