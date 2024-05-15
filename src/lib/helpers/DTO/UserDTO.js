function UserDTO(user) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.password=user.password;
    this.dob=user.dob;
    this.address=user.address;
}
  
module.exports = UserDTO;
  