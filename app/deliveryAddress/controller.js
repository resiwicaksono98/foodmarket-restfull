/** @format */

const DeliveryAddress = require("./model");

const store = async (req, res, next) => {
   try {
      let payload = req.body;

      let address = new DeliveryAddress({ ...payload, user: req.session.userId });
      await address.save();
      return res.json(address);
   } catch (err) {
      if (err && err.name === "ValidationError") {
         return res.json({
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
      let { skip = 0, limit = 10 } = req.query;
      let count = await DeliveryAddress.find({
         user: req.session.userId,
      }).countDocuments();
      let address = await DeliveryAddress.find({ user: req.session.userId }).skip(parseInt(skip)).limit(parseInt(limit));

      return res.status(200).json({ data: address, count });
   } catch (err) {
      next(err);
   }
};

const update = async (req, res, next) => {
   try {
      let { id } = req.params;
      let { _id, ...payload } = req.body;
      let address = await DeliveryAddress.findById(id);
      let subjectAddress = subject("DeliveryAddress", {
         ...address,
         user_id: address.user,
      });
      let policy = policyFor(req.user);
      if (!policy.can("update", subjectAddress)) {
         return res.json({
            error: 1,
            message: `You are allowed to modify this resource`,
         });
      }
      address = await DeliveryAddress.findByIdAndUpdate(id, payload, {
         runValidators: true,
         new: true,
      });
      return res.json(address);
   } catch (err) {
      if (err && err.name === "ValidationError") {
         return res.json({
            error: 1,
            message: err.message,
            field: err.errors,
         });
      }
      next();
   }
};

const destory = async (req, res, next) => {
   let policy = policyFor(req.user);
   try {
      let { id } = req.params;
      let address = await DeliveryAddress.findById(id);
      let subjectAddress = subject("DeliveryAddress", {
         ...address,
         user_id: address.user,
      });
      let policy = policyFor(req.user);
      if (!policy.can("delete", subjectAddress)) {
         return res.json({
            error: 1,
            message: `You are allowed to modify this resource`,
         });
      }
      address = await DeliveryAddress.findByIdAndDelete(id);
      return res.json(address);
   } catch (err) {
      if (err && err.name === "ValidationError") {
         return res.json({
            error: 1,
            message: err.message,
            fields: err.errors,
         });
      }
      next(err);
   }
};

module.exports = { store, index, update, destory };
