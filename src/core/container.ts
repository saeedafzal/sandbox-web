/**
 * Object registry.
 */
export default class Container {

    private static readonly registry = new Map<Function, object>();

    static register<T extends object>(instance: T): void {
        const type = instance.constructor;
        this.registry.has(type) ?
            console.warn(`Instance ${type.name} is already in container.`) :
            this.registry.set(type, instance);
    }

    static resolve<T extends object>(type: new (...args: any[]) => T): T {
        const instance = this.registry.get(type);
        if (!instance) {
            throw Error("No instance in container.");
        }
        return instance as T;
    }
}
