import m from "mithril";
import Component from "../core/component";
import EventBus from "../core/eventbus";
import Container from "../core/container";
import SandboxModel from "../models/sandboxmodel";
import ChatModel from "../models/chatmodel";
import LoaderView from "./loaderview";
import ChatView from "./chatview";

export default class SandboxView extends Component<SandboxModel> {

    override view() {
        const eventbus = Container.resolve(EventBus);
        return this.model.isLoading ?
            m(LoaderView) :
            m(ChatView, { model: new ChatModel(eventbus) });
    }
}
