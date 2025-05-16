import AbstractModel from "@/core/abstractmodel";

export default class DialogModel extends AbstractModel {

    /**
     * Reference to the dialog DOM element.
     */
    nameDialog!: HTMLDialogElement;

    /**
     * State of the form's fieldset.
     */
    disabled = false;

    /**
     * Alert message on dialog. Will not be displayed if empty.
     */
    alertMessage = "";

    override init() {
        this.eventbus.subscribe("ui.dialog.toggle", this.toggleDialog, this);
    }

    /**
     * Toggles dialog visibility.
     */
    toggleDialog(): void {
        !this.nameDialog.open ?
            this.nameDialog.showModal() :
            this.nameDialog.close();
    }

    /**
     * Sends request to set nickname to the server.
     */
    async submitForm(e: SubmitEvent): Promise<void> {
        e.preventDefault();
        this.disabled = true;

        const data = new FormData(e.target as HTMLFormElement);
        const nickname = data.get("name-input")?.toString() || "";
        console.debug(`Nickname: ${nickname}`);

        if (nickname.trim() === "") {
            this.disabled = false;
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/nickname`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nickname })
            });

            if (!res.ok) {
                throw Error(await res.text());
            }

            this.toggleDialog();
            this.eventbus.publish("ui.topbar.nickname", nickname);
        } catch (e) {
            const message = (e as Error).message;
            this.alertMessage = message;
            this.redraw();
        } finally {
            this.disabled = false;
        }
    }
}
