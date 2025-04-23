import { Attributes, Children, ClassComponent, Vnode } from "mithril";
import AbstractModel from "./abstractmodel";

export default abstract class AbstractComponent<M extends AbstractModel = AbstractModel, A extends Attributes = Attributes> implements ClassComponent<A> {

    protected readonly attrs: A;
    protected readonly model: M; // NOTE: Model may not exist on all components

    constructor({ attrs }: Vnode<A>) {
        this.attrs = attrs;
        this.model = attrs.model;
    }

    oncreate(): void {
        this.model?.init?.();
    }

    abstract view(): Children;
}
