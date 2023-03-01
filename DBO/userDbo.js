export class UserDBO {
  constructor({email, avatar, about, role, _id, isActivate}) {
    this._id = _id;
    this.email = email;
    this.avatar = avatar || null;
    this.about = about || null;
    this.role = role;
    this.isActivate = isActivate;
  }
}