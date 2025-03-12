import { beforeEach, describe, expect, test } from "vitest";
import Container from "../../src/core/container";

describe("Container", () => {

    beforeEach(() => {
        Container["registry"].clear();
    });

    test("should register and resolve instance", () => {
        class Example {}
        const instance = new Example();

        Container.register(instance);
        const actual = Container.resolve(Example);

        expect(actual).toBe(instance);
    });

    test("should throw error on resolving unregistered instance", () => {
        class Example {}

        expect(() => Container.resolve(Example))
            .toThrowError("No instance in container.");
    });

    test("should not register on duplicate instance type and warn", () => {
        class Example {}
        const instance = new Example();

        let warningCalled = false;
        let message = "-";

        const original = console.warn;
        console.warn = msg => {
            warningCalled = true;
            message = msg;
        };

        Container.register(instance);
        Container.register(instance);

        expect(warningCalled).toBeTruthy();
        expect(message).toBe("Instance Example is already in container.");

        console.warn = original;
    });
});
