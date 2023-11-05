const { existsSync, unlinkSync } = require("fs");
const db = require("../../database/models");

module.exports = (req, res) => {
  db.Image.findAll({
    where: {
      productId: req.params.id,
    },
  })
    .then((images) => {
      images.forEach((image) => {
        existsSync(`./public/img/products/${image.file}`) &&
          unlinkSync(`./public/img/products/${image.file}`);
      });

      db.Product.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        return res.redirect("/admin");
      });
    })

    .catch((error) => console.log(error));
};
