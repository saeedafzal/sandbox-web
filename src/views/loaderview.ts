import m from "mithril";
import AbstractComponent from "@/core/abstractcomponent";

export default class LoaderView extends AbstractComponent {

    override view() {
        return m("main", [
            m("img", {
                src: "",
                alt: "Sandbox Web"
            }),
            m(".spinner")
        ]);
    }
}
