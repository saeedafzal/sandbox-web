import m from "mithril";
import AbstractComponent from "@/core/abstractcomponent";
import ChatModel from "@/models/chatmodel";

export default class ChatView extends AbstractComponent<ChatModel> {

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
                    m("div"),

                    // Editor
                    m("div", [
                        m("[contenteditable][placeholder=Enter message...]"),
                        m("button", "Send")
                    ])
                ]),

                // Sidebar
                m("aside", [
                    m("h3", "User List"),
                    m("ul")
                ])
            ])
        ]);
    }
}
