import EventBus from "@/core/eventbus";

export default class WebSocketHandler {

    private readonly eventbus: EventBus;

    constructor(eventbus: EventBus) {
        this.eventbus = eventbus;
    }

    connect() {
        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
        ws.onopen = () => this.open();
        ws.onmessage = e => this.message(e);
        ws.onclose = this.close;
        ws.onerror = this.error;
    }

    private open(): void {
        console.log("[WS] Websocket connected.");
        this.eventbus.publish("ws.connected");
    }

    private message(e: MessageEvent): void {
        console.debug(`[WS] Received websocket message: ${e.data}`);

        const data = JSON.parse(e.data);

        switch (data["type"]) {
            case "initial":
                this.eventbus.publish("ws.users", data.users);
                break;
            case "message":
                this.eventbus.publish("ws.message", data);
                break;
            default:
                console.error("Did not receive a valid websocket payload.");
        }
    }

    private close({ code, reason, wasClean }: CloseEvent): void {
        console.log(`[WS] Websocket closed: code=${code} reason=${reason} wasClean=${wasClean}`);
    }

    private error(e: Event): void {
        console.error(`[WS] Websocket error: ${e}`);
    }
}
