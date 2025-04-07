import { mount } from "svelte";
import Sandbox from "$src/views/sandbox.svelte";

// Print application information
const environment = import.meta.env.MODE;
console.log(`Sandbox | ${import.meta.env.VITE_VERSION} | ${environment}`);

// Disable debug logs in production
if (environment === "production") {
    console.debug = () => undefined;
}

// Render
export default mount(Sandbox, { target: document.body });
