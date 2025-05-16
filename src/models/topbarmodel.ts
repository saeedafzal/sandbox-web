import AbstractModel from "@/core/abstractmodel";

export default class TopBarModel extends AbstractModel {

    nickname = "Set Name";

    override init() {
        this.eventbus.subscribe("ui.topbar.nickname", this.nicknameCallback, this);
    }

    toggleDialog(): void {
        this.eventbus.publish("ui.dialog.toggle");
    }

    private nicknameCallback(nickname: string): void {
        this.nickname = nickname;
        this.redraw();
    }
}
