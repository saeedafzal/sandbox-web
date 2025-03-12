import m from "mithril";
import Component from "../core/component";
import ChatModel from "../models/chatmodel";

export default class ChatView extends Component<ChatModel> {

    override view() {
        return m("#root.sandbox", [
            m("nav", [
                m("div", [
                    m("h3", "Sandbox"),
                    m("button", "Set Nickname")
                ]),
                m("div", [
                    m("button", "tg"),
                    m("button", "ul"),
                    m("button", "th")
                ])
            ]),
            m(".container", [
                m(".chat", [
                    m(".chat-history", [
                        this.model.messages.map(msg => m(".bubble", [
                            m(".bubble-avatar", msg.sender[0]),
                            m(".bubble-container", [
                                m(".bubble-head", [
                                    m("strong", "Sender"),
                                    m("small", "0:00 AM"),
                                ]),
                                m("div", "Reiciendis aut neque laboriosam cupiditate commodi aperiam. Quisquam ab maiores iusto est officiis a. Assumenda qui modi nisi. Officiis sed quos sunt provident maxime velit minima. Velit et sequi aut voluptatem mollitia accusamus praesentium.")
                            ])
                        ]))
                    ]),
                    m("aside", [
                        m("h3", "User List"),
                        m("ul", [
                            m("li", "First"),
                            m("li", "User 1"),
                            m("li", "User 2"),
                            m("li", "Last")
                        ])
                    ])
                ]),
                m("footer", [
                    m(".editor[contenteditable][placeholder=Enter message...]"),
                    m("button.primary", "Send")
                ])
            ])
        ]);
    }
}
