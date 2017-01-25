import {TripActivity} from "./trip-activity.model";
export class TripActivityDayGroup {
	public title?: string;
	public date?: string;
	public day?: string;
	public activities: TripActivity[];
}