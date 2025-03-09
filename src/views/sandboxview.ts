import m from "mithril";

export default function SandboxView() {

    const view = () => {
        return m("#root", [
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
            m("div", [
                m("div", [
                    m(".chat-history", [
                        m(".bubble", [
                            m(".avatar", "S"),
                            m("div", [
                                m("div", [
                                    m("strong", "Sender"),
                                    m("small", "0:00 AM"),
                                ]),
                                m("div", "The actual message body.")
                            ])
                        ])
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
                    m("button", "Send")
                ])
            ])
        ]);
    };

    return { view };
}
