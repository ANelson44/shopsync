const { User, List, Item } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "lists.items",
          populate: "list",
        });

        user.lists.sort((a, b) => b.addedDate - a.addedDate);

        return user;
      }

      throw AuthenticationError;
    },
    list: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "lists.items",
          populate: "list",
        });

        return user.lists.id(_id);
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    createList: async (parent, { items }, context) => {
      console.log(context);
      if (context.user) {
        const list = new List({ items });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { lists: list },
        });

        return list;
      }

      throw AuthenticationError;
    },
    addItemToList: async (parent, { listId, itemName }, context) => {
      if (context.user) {
        const list = await List.findById(listId);

        if (!list) {
          throw new Error("List not found");
        }

        const newItem = await Item.create({ name: itemName });

        list.items.push(newItem._id);
        await list.save();

        const populatedList = await list.populate("items").execPopulate();

        return populatedList;
      }

      throw new AuthenticationError(
        "You must be logged in to add an item to a list"
      );
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    logout: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You are not logged in");
      }

      localStorage.removeItem("token");

      return { message: "Logout successful" };
    },
  },
};

module.exports = resolvers;
