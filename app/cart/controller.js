const Product = require("../product/model");
const CartItem = require("../cart-item/model");

const update = async (req, res, next) => {
  try {
    const { items } = req.body;
    const productIds = items.map((item) => item.product._id);
    const products = await Product.find({ _id: { $in: productIds } });

    let cartItems = items.map((item) => {
      let relatedProduct = products.find(
        (product) => product._id.toString() === item.product._id
      );
      return {
        product: relatedProduct._id,
        price: item.price,
        image_url: relatedProduct.image_url,
        name: relatedProduct.name,
        user: req.session.userId,
        qty: item.qty,
      };
    });
    await CartItem.deleteMany({ user: req.session.user_id });
    await CartItem.bulkWrite(
      cartItems.map((item) => {
        return {
          updateOne: {
            filter: {
              user: req.session.userId,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        };
      })
    );
    return res.json(cartItems);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let items = await CartItem.find({ user: req.session.userId }).populate(
      "product"
    );
    return res.status(200).json(items);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      res.status(500).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = { index, update };
