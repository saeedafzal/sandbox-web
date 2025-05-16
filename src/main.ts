import m from "mithril";
import SandboxView from "./views/sandboxview";
import SandboxModel from "./models/sandboxmodel";
import ChatModel from "./models/chatmodel";
import TopBarModel from "./models/topbarmodel";
import DialogModel from "./models/dialogmodel";
import WebSocketHandler from "./core/api/websockethandler";
import EventBus from "./core/eventbus";
import Container from "./core/container";
import "./style/main.css";

// Print information
const environment = import.meta.env.MODE;
console.log(`Sandbox | ${import.meta.env.VITE_VERSION} | ${environment}`);

// Disable debug logs in production environment
if (environment === "production") {
    console.debug = () => undefined;
}

// Initialise
const eventbus = new EventBus();
const webSocketHandler = new WebSocketHandler(eventbus);

// Models
const sandboxModel = new SandboxModel(eventbus, webSocketHandler);
Container.register(new ChatModel(eventbus));
Container.register(new TopBarModel(eventbus));
Container.register(new DialogModel(eventbus));

// Get root element
const root = document.getElementById("root");
if (!root) {
    throw Error("Could not get root element.");
}

// Create root component
const component = {
    view() {
        return m(SandboxView, { model: sandboxModel });
    }
};

// Routes
m.route(root, "/", {
    "/": component
});
