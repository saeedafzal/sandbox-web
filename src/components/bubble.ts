import m, { Vnode } from "mithril";
import AbstractComponent from "@/core/abstractcomponent";
import AbstractModel from "@/core/abstractmodel";

interface BubbleAttrs {
    sender: string;
    message: string;
    timestamp: number;
}

export default class Bubble extends AbstractComponent<AbstractModel, BubbleAttrs> {

    private readonly formatter = new Intl.DateTimeFormat(undefined, {
        hour:   "numeric",
        minute: "2-digit",
        hour12: true
    });

    override view({ attrs }: Vnode<BubbleAttrs>) {
        const { sender, message, timestamp } = attrs;

        return m(".bubble", [
            m(".avatar", sender[0].toUpperCase()),
            m("div", [
                m("div", [
                    m("strong", sender),
                    m("time", this.formatter.format(timestamp))
                ]),
                m("div", message)
            ])
        ]);
    }
}
