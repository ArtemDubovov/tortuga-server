export class UserDBO {
  constructor({email, avatar, about, role, _id, isActivation}) {
    this._id = _id;
    this.email = email;
    this.avatar = avatar || null;
    this.about = about || null;
    this.role = role;
    this.isActivation = isActivation;
  }
}