import { IDeseriazable } from './deserializable.model';

export class User implements IDeseriazable {

    name: string;
    email: any;
    mobileNumber: string;
    userType: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}