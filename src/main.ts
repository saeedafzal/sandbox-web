import m from "mithril";
import EventBus from "./core/eventbus";
import SandboxView from "./views/sandboxview";
import SandboxModel from "./models/sandboxmodel";
import "./styles/main.css";

// Print application information
const environment = import.meta.env.MODE;
console.log(`Sandbox | ${import.meta.env.VITE_VERSION} | ${environment}`);

// Disable debug logs
if (environment === "production") {
    console.debug = () => undefined;
}

// Initialising
const eventbus = new EventBus();

// Initialise client routes
m.route.prefix = "";
m.route(document.body, "/", {
    "/": { render: _ => m(SandboxView, { model: new SandboxModel(eventbus) }) }
});
