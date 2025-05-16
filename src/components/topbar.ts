import m from "mithril";
import AbstractComponent from "@/core/abstractcomponent";
import TopBarModel from "@/models/topbarmodel";

export default class TopBar extends AbstractComponent<TopBarModel> {

    override view() {
        return m("nav", [
            m("div", [
                m("h3", "Sandbox"),
                m("button", { onclick: () => this.model.toggleDialog() }, this.model.nickname)
            ]),
            m("div", [
                m("button", "Clear"),
                m("button", "User List"),
                m("button", "Theme")
            ])
        ]);
    }
}
