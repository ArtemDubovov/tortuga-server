export class UserDBO {
  constructor({email, avatar, about, role, _id}) {
    this._id = _id;
    this.email = email;
    this.avatar = avatar;
    this.about = about;
    this.role = role;
  }
}