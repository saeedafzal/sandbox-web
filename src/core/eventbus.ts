interface Subscription {
    callback: (...args: unknown[]) => void;
    context: unknown;
}

export default class EventBus {

    private readonly subscriptions: Record<string, Subscription[]> = {};

    subscribe(event: string, subscription: Subscription): void {
        this.subscriptions[event] = this.subscriptions[event] || [];
        this.subscriptions[event].push(subscription);
        console.debug(`[DEV] EventBus subscribe: event=${event} total=${this.subscriptions[event].length}`);
    }

    publish(event: string, ...args: unknown[]): void {
        if (!this.subscriptions[event]) {
            return;
        }

        this.subscriptions[event].forEach(subscription => {
            subscription.callback(subscription.context, ...args);
        });
    }
}
