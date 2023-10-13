const { v4: uuidv4 } = require('uuid');
const {hashSync} = require('bcryptjs')

const Product = function ({name, surname, email, password, image}) {

    this.id = uuidv4();
    this.name = name.trim();
    this.surname = surname.trim();
    this.email = email.trim();
    this.password = hashSync(password,10);
    this.role = 'user';
    this.birthday = null,
    this.address = null,
    this.province = null,
    this.city = null,
    this.image = image;
    
    this.createAt = new Date;
}

module.exports = Product