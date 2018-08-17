export class User {
	public id: string = ""
	public first_name: string = ""
	public last_name: string = ""
	public email: string = ""
	public cell_phone: string = ""
	public country: string = ""
	public hospital: string =""

  constructor(public user: object)  {
  	if (user) {
	  	this.id = user.id;
	  	this.first_name = user.first_name;
	  	this.last_name = user.last_name;
	  	this.email = user.email;
	  	this.cell_phone = user.cell_phone;
	  	this.country = user.country;
	  	this.hospital = user.hospital;
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
