import AbstractModel from "@/core/abstractmodel";
import EventBus from "@/core/eventbus";
import WebSocketHandler from "@/core/api/websockethandler";

export default class SandboxModel extends AbstractModel {

    isLoading = true;

    private readonly webSocketHandler: WebSocketHandler;

    constructor(eventbus: EventBus, webSocketHandler: WebSocketHandler) {
        super(eventbus);
        this.webSocketHandler = webSocketHandler;
    }

    override init() {
        this.eventbus.subscribe("ws.connected", this.onConnect, this);
        this.webSocketHandler.connect();
    }

    private onConnect(): void {
        this.isLoading = false;
        this.redraw();
        this.eventbus.unsubscribe("ws.connected", this);
    }
}
