import Collection from './collection';

export default class List extends Collection {
    constructor(value) {
        super();
        this._value = value;
    }
}
