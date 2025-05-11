type Callback = (...args: any[]) => void;

interface Subscription {
    callback: Callback;
    context: unknown;
}

export default class EventBus {

    private readonly subs: Record<string, Subscription[]> = {};
    private readonly queue: Record<string, unknown[]> = {};

    subscribe(event: string, callback: Callback, context: unknown): void {
        this.subs[event] = this.subs[event] || [];
        this.subs[event].push({ callback, context });

        const args = this.queue[event];
        if (args) {
            callback.call(context, ...args);
            delete this.queue[event];
        }
    }

    publish(event: string, ...args: unknown[]): void {
        console.debug(`[EventBus] Publishing event: ${event}`);

        const subs = this.subs[event];

        if (!subs) {
            this.queue[event] = args;
        } else {
            subs.forEach(({ callback, context }) => {
                callback.call(context, ...args);
            });
        }
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
