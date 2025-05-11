import m from "mithril";
import AbstractComponent from "@/core/abstractcomponent";
import SandboxModel from "@/models/sandboxmodel";
import LoaderView from "./loaderview";
import ChatView from "./chatview";
import ChatModel from "@/models/chatmodel";
import Container from "@/core/container";
import EventBus from "@/core/eventbus";

export default class SandboxView extends AbstractComponent<SandboxModel> {

    override view() {
        const eventbus = Container.resolve(EventBus);
        const model = new ChatModel(eventbus);

        return this.model.isLoading
            ? m(LoaderView)
            : m(ChatView, { model });
    }
}
