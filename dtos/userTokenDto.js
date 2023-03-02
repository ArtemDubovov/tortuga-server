export class UserTokenDto {
  constructor({email, _id}) {
    this._id = _id;
    this.email = email;
  }
}