export class TripActivityDetail {
	public lang_code?: string;
	public title?: string;
	public description?: string;
	public notes?: string;
	public meeting_point?: string;
}
export class TripActivity {
	public id?: number;
	public title?: string;
	public description?: string;
	public type?: number;
	public type_slug?: string;
	public trip_id?: number;
	public cover_image?: string;
	public coverImages?: any;
	public start?: any;
	public end?: any;
	public from?: string;
	public from_lat?: any;
	public from_long?: any;
	public to?: string;
	public to_lat?: any;
	public to_long?: any;
	public extras?: string;
	public reference_number?: string;
	public provider?: string;
	public website?: string;
	public contact_number?: string;
	public meeting_point?: string;
	public notes?: string;
	public lang_code?: string;
	public offers?: any;
	public en?: TripActivityDetail;
	public es?: TripActivityDetail;
	public de?: TripActivityDetail;
	public zh?: TripActivityDetail;
	public it?: TripActivityDetail;
	public fr?: TripActivityDetail;
	public ja?: TripActivityDetail;

	constructor() {

		if (!this.en) {
			this.en = new TripActivityDetail();
		}
		if (!this.es) {
			this.es = new TripActivityDetail();
		}
		if (!this.de) {
			this.de = new TripActivityDetail();
		}
		if (!this.zh) {
			this.zh = new TripActivityDetail();
		}
		if (!this.it) {
			this.it = new TripActivityDetail();
		}
		if (!this.fr) {
			this.fr = new TripActivityDetail();
		}
		if (!this.ja) {
			this.ja = new TripActivityDetail();
		}
	}
}