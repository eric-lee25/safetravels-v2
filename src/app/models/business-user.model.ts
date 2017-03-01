export class BusinessUser {
	public id?: number;
	public first_name?: string;
	public last_name?: string;
	public city?: string;
	public state_code?: any;
	public country_code?: any;
	public avatar?: string;
	public email?: string;
	public contact_number?: string;
	public cover_image?: string;
	public user_type?: string;
	public send_invite_now?: boolean;
	public role?: string;
}

export class InviteBusinessUser {
	public id?: number;
	public first_name?: string;
	public last_name?: string;
	public city?: string;
	public state_code?: any;
	public country_code?: any;
	public avatar?: string;
	public email?: string;
	public contact_number?: string;
	public cover_image?: string;
	public user_type?: string;
	public send_invite_now?: boolean;
	public role?: string;
	public sent?: boolean;
}