type Callback = (...args: unknown[]) => void;

interface Subscription {
    callback: Callback;
    context: unknown;
}

export default class EventBus {

    private readonly subs: Record<string, Subscription[]> = {};

    subscribe(event: string, callback: Callback, context: unknown): void {
        this.subs[event] = this.subs[event] || [];
        this.subs[event].push({ callback, context });
    }

    publish(event: string, ...args: unknown[]): void {
        const subs = this.subs[event];
        if (!subs) {
            return;
        }

        subs.forEach(({ callback, context }) => {
            callback.call(context, ...args);
        });
    }

    unsubscribe(event: string, context: unknown): void {
        if (!this.subs[event]) {
            return;
        }
        this.subs[event] = this.subs[event].filter(sub => sub.context !== context);
    }

    unsubscribeAll(context: unknown): void {
        for (const event of Object.keys(this.subs)) {
            const filtered = this.subs[event].filter(sub => sub.context !== context);
            if (filtered.length > 0) {
                this.subs[event] = filtered;
            } else {
                delete this.subs[event];
            }
        }
    }
}
