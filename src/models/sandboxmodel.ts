import Model from "../core/model";

interface Message {
    sender: string;
}

export default class SandboxModel extends Model {

    messages: Message[] = [];
}
