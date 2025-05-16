import AbstractModel from "@/core/abstractmodel";

interface SingleMessage {
    sender: string;
    message: string;
    timestamp: number;
}

export default class ChatModel extends AbstractModel {

    userList: string[] = [];
    messages: SingleMessage[] = [];

    override init() {
        this.eventbus.subscribe("ws.users", this.userListCallback, this);
        this.eventbus.subscribe("ws.message", this.messageCallback, this);
    }

    toggleDialog(): void {
        this.eventbus.publish("ui.dialog.toggle");
    }

    private userListCallback(userList: string[]): void {
        this.userList = userList || [];
        this.redraw();
    }

    private messageCallback(message: SingleMessage): void {
        this.messages.push(message);
        this.redraw();
    }
}
