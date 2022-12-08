import { configure, makeAutoObservable } from "mobx";
import { ServerError } from "../models/ServerError";

configure({
    enforceActions: "observed"
    });

    
export default class CommonStore {
    error: ServerError | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setServerError(error: ServerError) {
        this.error = error;
    }
}