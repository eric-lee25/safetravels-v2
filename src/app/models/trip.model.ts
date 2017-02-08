import {TripManager} from "./trip-manager.models";
import {TripGuide} from "./trip-guide.model";
export class Trip {
	public id?: number;
	public code?: string;
	public cover_image?: string;
	public coverImages?: any;
	public title?: string;
	public description?: string;
	public admin_id?: number;
	public guide_id?: number;
	public business_id?: number;
	public start_date?: any;
	public end_date?: any;
	public country_code?: string;
	public state_code?: string;
	public city?: string;
	public start_location?: string;
	public start_location_lat?: any;
	public start_location_long?: any;
	public admin?: any;
	public guide?: any;
	public admin_chat_enabled?: boolean;
	public guide_chat_enabled?: boolean;
	public group_chat_enabled?: boolean;

}
