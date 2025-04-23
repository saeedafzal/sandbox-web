import m from "mithril";
import EventBus from "./eventbus";

export default abstract class AbstractModel {

    protected readonly eventbus: EventBus;

    constructor(eventbus: EventBus) {
        this.eventbus = eventbus;
    }

    init?(): void;

    destroy(): void {
        this.eventbus.unsubscribeAll(this);
    }

    protected redraw() {
        m.redraw();
    }
}
