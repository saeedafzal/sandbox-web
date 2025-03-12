import { beforeEach, describe, expect, test, vi } from "vitest";
import EventBus from "../../src/core/eventbus";

describe("EventBus", () => {

    let eventbus: EventBus;

    beforeEach(() => {
        eventbus = new EventBus();
    });

    test.each([
        { args: [] },
        { args: ["abc", 123] }
    ])("should publish event to subscriber", ({ args }) => {
        const callback = vi.fn();
        eventbus.subscribe("test.event", { callback, context: {} });
        eventbus.publish("test.event", ...args);

        expect(callback).toHaveBeenCalledWith(...args);
    });

    test.each([
        { args: [] },
        { args: ["abc", 123] }
    ])("should publish event to multiple subscribers", ({ args }) => {
        const callbackOne = vi.fn();
        const callbackTwo = vi.fn();

        eventbus.subscribe("test.event", { callback: callbackOne, context: this });
        eventbus.subscribe("test.event", { callback: callbackTwo, context: this });
        eventbus.publish("test.event", ...args);

        expect(callbackOne).toHaveBeenCalledWith(...args);
        expect(callbackTwo).toHaveBeenCalledWith(...args);
    });

    test("should not publish event if not subscribed", () => {
        const callback = vi.fn();
        eventbus.publish("test.event");
        expect(callback).not.toHaveBeenCalled();
    });
});
