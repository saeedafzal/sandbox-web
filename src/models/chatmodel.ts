import AbstractModel from "@/core/abstractmodel";

interface SingleMessage {
    sender: string;
    message: string;
    timestamp: number;
}

export default class ChatModel extends AbstractModel {

    nameDialog!: HTMLDialogElement;

    userList: string[] = [];
    messages: SingleMessage[] = [];

    override init() {
        this.eventbus.subscribe("ws.users", this.userListCallback, this);
        this.eventbus.subscribe("ws.message", this.messageCallback, this);
    }

    toggleNameModal(): void {
        console.debug("Toggling name dialog.");
        !this.nameDialog.open ?
            this.nameDialog.showModal() :
            this.nameDialog.close();
    }

    private userListCallback(userList: string[]): void {
        this.userList = userList;
        this.redraw();
    }

    private messageCallback(message: SingleMessage): void {
        this.messages.push(message);
        this.redraw();
    }
}
