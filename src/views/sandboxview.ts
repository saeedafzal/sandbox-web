import m from "mithril";
import AbstractComponent from "@/core/abstractcomponent";
import SandboxModel from "@/models/sandboxmodel";
import LoaderView from "./loaderview";
import ChatView from "./chatview";
import ChatModel from "@/models/chatmodel";
import Container from "@/core/container";

export default class SandboxView extends AbstractComponent<SandboxModel> {

    override view() {
        const model = Container.resolve(ChatModel);
        return this.model.isLoading
            ? m(LoaderView)
            : m(ChatView, { model });
    }
}
