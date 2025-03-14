import EventBus from "./eventbus";

export default abstract class Model {

    protected readonly eventbus: EventBus;

    constructor(eventbus: EventBus) {
        this.eventbus = eventbus;
        console.debug("Model created.");
    }
}
