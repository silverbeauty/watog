export class User {
	public id: string
	public first_name: string
	public last_name: string
	public email: string
	public cell_phone: string
	public country: string
	public hospital: string

  constructor(public user: object)  {
  	if (user) {
	  	this.id = this.user.id;
	  	this.first_name = this.user.first_name;
	  	this.last_name = this.user.last_name;
	  	this.email = this.user.email;
	  	this.cell_phone = this.user.cell_phone;
	  	this.country = this.user.country;
	  	this.hospital = this.user.hospital;
  	}
  }
}

export class Auth extends User {
	public token: string
	constructor(public user: object, token: string ) {
		super(user);
		this.token = token;
	}
}
