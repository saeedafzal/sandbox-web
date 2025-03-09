import m from "mithril";
import SandboxView from "./views/sandboxview";
import "./styles/main.css";

// Print application information
const environment = import.meta.env.MODE;
console.log(`Sandbox | ${import.meta.env.VITE_VERSION} | ${environment}`);

// Disable debug logs
if (environment === "production") {
    console.debug = () => undefined;
}

// Initialise client routes
m.route.prefix = "";
m.route(document.body, "/", {
    "/": SandboxView
});
