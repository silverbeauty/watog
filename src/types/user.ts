export class User {
	public first_name: string;
	public last_name: string;
	public email: string;
	public cell_phone: string;
	public country: string;
	public hospital: string;
	public proof_of_status: string;
  public proof_of_status_date: string;
  public picture_profile: string;
  public picture_cover: string;
  public other_speciality: string;
}

export class Auth extends User {
  public id: string;
	public token: string;
	public sms_verified_date: any;
	public email_verified_date: any;
}
