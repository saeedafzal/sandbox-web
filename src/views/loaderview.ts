import m from "mithril";
import Component from "../core/component";

export default class LoaderView extends Component {

    override view() {
        return m("div", "Loading");
    }
}
