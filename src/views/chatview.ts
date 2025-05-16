import m from "mithril";
import AbstractComponent from "@/core/abstractcomponent";
import Container from "@/core/container";
import ChatModel from "@/models/chatmodel";
import Bubble from "@/components/bubble";
import Dialog from "@/components/dialog";
import TopBar from "@/components/topbar";
import TopBarModel from "@/models/topbarmodel";
import DialogModel from "@/models/dialogmodel";

export default class ChatView extends AbstractComponent<ChatModel> {

    override view() {
        const topBarModel = Container.resolve(TopBarModel);
        const dialogModel = Container.resolve(DialogModel);

        return m("main", [
            m(TopBar, { model: topBarModel }),

            m("div", [
                m("div", [
                    // Chat history
                    m(".chat-history", [ this.model.messages.map(msg => m(Bubble, msg)) ]),

                    // Editor
                    m("div", [
                        m("[contenteditable=false][placeholder=Enter message...]"),
                        m("button[disabled]", "Send")
                    ])
                ]),

                // Sidebar user list
                m("aside", [
                    m("h3", "User List"),
                    m("ul", [ this.model.userList.map(user => m("li", user)) ])
                ])
            ]),

            // Set nickname dialog
            m(Dialog, { model: dialogModel })
        ]);
    }
}
