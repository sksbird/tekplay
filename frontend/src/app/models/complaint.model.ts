import { IDeseriazable } from './deserializable.model';

export class Complaint implements IDeseriazable {

    name: String;
    description: any;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}