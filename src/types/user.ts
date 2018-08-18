export class User {
	public id: string;
	public first_name: string;
	public last_name: string;
	public email: string;
	public cell_phone: string;
	public country: string;
	public hospital: string;
}

export class Auth extends User {
	public token: string;
}
