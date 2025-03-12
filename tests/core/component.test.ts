import m, { Vnode } from "mithril";
import { describe, expect, test, vi } from "vitest";
import Component from "../../src/core/component";
import Model from "../../src/core/model";
import EventBus from "../../src/core/eventbus";

vi.mock("../../src/core/eventbus");

describe("Component", () => {

    test("should return model if supplied", () => {
        class ExampleModel extends Model {}
        const model = new ExampleModel(new EventBus());

        class ExampleComponent extends Component {
            override view() { return m("div", "?"); }
        }
        const vnode = { attrs: { model } } as unknown as Vnode;
        const component = new ExampleComponent(vnode);

        // @ts-ignore - to ignore error accessing protected model
        expect(component.model).toBe(model);
    });

    test("should return model if supplied", () => {
        class ExampleComponent extends Component {
            override view() { return m("div", "?"); }
        }
        const vnode = { attrs: {} } as unknown as Vnode;
        const component = new ExampleComponent(vnode);

        // @ts-ignore - to ignore error accessing protected model
        expect(() => component.model).toThrow("No model for this component.");
    });
});
