import {TripMessage} from "../models/trip-message.model";
export class MessageTemplate {
	public id?: number;
	public title?: string;
	public template?: TripMessage;

	constructor() {
		if (!this.template) {
			this.template = new TripMessage();
		}
	}
}