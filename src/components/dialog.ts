import m from "mithril";
import AbstractComponent from "@/core/abstractcomponent";
import DialogModel from "@/models/dialogmodel";

export default class Dialog extends AbstractComponent<DialogModel> {

    override oncreate() {
        super.oncreate();
        this.model.nameDialog = document.getElementById("name-dialog") as HTMLDialogElement;
    }

    override view() {
        return m("dialog#name-dialog", { oncancel: (e: Event) => e.preventDefault() }, [
            m("form[method=dialog]", { onsubmit: (e: SubmitEvent) => this.model.submitForm(e) }, [
                m("h3", "Set Name"),
                m("fieldset", { disabled: this.model.disabled }, [
                    m("input[required][name=name-input]"),
                    m(".alert", this.model.alertMessage),
                    m("div", [
                        m("button[type=button]", { onclick: () => this.model.toggleDialog() }, "Cancel"),
                        m("button", "Set Name")
                    ])
                ])
            ])
        ])
    }
}
