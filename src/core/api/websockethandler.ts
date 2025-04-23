import EventBus from "@/core/eventbus";

export default class WebSocketHandler {

    private readonly eventbus: EventBus;

    constructor(eventbus: EventBus) {
        this.eventbus = eventbus;
    }

    connect() {
        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
        ws.onopen = () => this.open();
        ws.onclose = this.close;
        ws.onerror = this.error;
    }

    private open(): void {
        console.log("[WS] Websocket connected.");
        this.eventbus.publish("ws.connected");
    }

    private close({ code, reason, wasClean }: CloseEvent): void {
        console.log(`[WS] Websocket closed: code=${code} reason=${reason} wasClean=${wasClean}`);
    }

    private error(e: Event): void {
        console.error(`[WS] Websocket error: ${e}`);
    }
}
