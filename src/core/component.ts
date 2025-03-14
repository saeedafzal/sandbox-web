import { Attributes, Children, ClassComponent, Vnode } from "mithril";
import Model from "./model";

interface Attrs<M> extends Attributes {
    model?: M;
}

export default abstract class Component<M extends Model = Model, A extends Attrs<M> = Attrs<M>> implements ClassComponent<A> {

    private readonly _model?: M;

    constructor({ attrs }: Vnode<A>) {
        this._model = attrs.model;
    }

    /**
     * @override
     */
    abstract view(): Children;

    protected get model(): M {
        if (!this._model) {
            throw Error("No model for this component.");
        }
        return this._model;
    }
}
