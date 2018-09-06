export class User {
  public id: number;
	public first_name: string;
	public user_name: string;
	public last_name: string;
	public email: string;
	public password: string;
	public cell_phone: string;
	public country: string;
	public hospital: string;
	public job: string;
	public proof_of_status: string;
  public proof_of_status_date: string;
  public picture_profile: string;
  public picture_cover: string;
  public sms_verified_date: any;
  public email_verified_date: any; 
}

export class Auth extends User {
	public token: string;
	public good_posts: any;
}
