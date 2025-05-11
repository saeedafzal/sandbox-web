import m from "mithril";
import AbstractComponent from "@/core/abstractcomponent";
import ChatModel from "@/models/chatmodel";
import Bubble from "@/components/bubble";

export default class ChatView extends AbstractComponent<ChatModel> {

    override oncreate() {
        super.oncreate();
        this.model.nameDialog = document.getElementById("name-dialog") as HTMLDialogElement;
    }

    override view() {
        return m("main", [
            // Top bar
            m("nav", [
                m("div", [
                    m("h3", "Sandbox"),
                    m("button", {
                        onclick: () => this.model.toggleNameModal()
                    }, "Set Name")
                ]),
                m("div", [
                    m("button", "Clear"),
                    m("button", "User List"),
                    m("button", "Theme")
                ])
            ]),

            // Container
            m("div", [
                // Chat content
                m("div", [
                    // Chat history
                    m(".chat-history", [ this.model.messages.map(msg => m(Bubble, msg)) ]),

                    // Editor
                    m("div", [
                        m("[contenteditable=false][placeholder=Enter message...]"),
                        m("button[disabled]", "Send")
                    ])
                ]),

                // Sidebar
                m("aside", [
                    m("h3", "User List"),
                    m("ul", [ this.model.userList.map(user => m("li", user)) ])
                ])
            ]),

            // Name dialog
            m("dialog#name-dialog", [
                m("form", [
                    m("h3", "Set Name"),
                    m("fieldset", [
                        m("input[required][name=name-input]"),
                        m("div", [
                            m("button", "Cancel"),
                            m("button", "Set Name")
                        ])
                    ])
                ])
            ])
        ]);
    }
}
