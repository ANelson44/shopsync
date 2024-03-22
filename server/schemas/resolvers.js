const { User, List, Item } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { GraphQLScalarType } = require('graphql');

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom scalar type for Date',
    parseValue(value) {
      // Convert incoming value to Date object
      return new Date(value);
    },
    serialize(value) {
      // Convert Date object to string for output
      return value.toISOString();
    },
  }),
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
    createList: async (parent, { title }, context) => {
      console.log(context);
      if (context.user) {
        const list = new List({ title, createdBy: context.user._id });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { lists: list },
        });

        await list.save();

        return list;
      }

      throw AuthenticationError;
    },
    deleteList: async (parent, { listId }, context) => {
      if (context.user) {
        const list = await List.findById(listId);
    
        if (!list) {
          throw new Error("List not found");
        }
    
        if (list.createdBy.toString() !== context.user.id) {
          throw new Error("You are not authorized to delete this list");
        }
    
        await List.findByIdAndDelete(listId);
    
        return "List deleted successfully";
      }
    
      throw new AuthenticationError(
        "You must be logged in to delete a list"
      );
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
          
    deleteItemFromList: async (parent, { listId, itemId }, context) => {
      if (context.user) {
        const list = await List.findById(listId);

        if (!list) {
          throw new Error("List not found");
        }

        if (!list.items.includes(itemId)) {
          throw new Error("Item not found in the list");
        }

        list.items = list.items.filter(item => item.toString() !== itemId);
        
        await list.save();

        await Item.findByIdAndDelete(itemId);

        const populatedList = await list.populate("items").execPopulate();

        return populatedList;
      }

      throw new AuthenticationError(
        "You must be logged in to delete an item from a list"
      );
    },
    addCollaboratorToList: async (parent, { listId, userId }, context) => {
      if (context.user) {
        const list = await List.findById(listId);
  
        if (!list) {
          throw new Error("List not found");
        }
  
        // Check if the user is the owner of the list
        if (list.createdBy.toString() !== context.user._id) {
          throw new Error("Only the owner can add collaborators to the list");
        }
  
        /// Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      // Add the user as a collaborator if not already added
      if (!list.collaborators.includes(user._id)) {
        list.collaborators.push(user._id);
      }

      // Save the updated list
      await list.save();

      return list;
    }

    throw new AuthenticationError("You must be logged in to add a collaborator to a list");
  },
  deleteList: async (parent, { listId }, context) => {
    if (context.user) {
      const list = await List.findById(listId);
  
      if (!list) {
        throw new Error("List not found");
      }
  
      if (list.createdBy.toString() !== context.user.id) {
        throw new Error("You are not authorized to delete this list");
      }
  
      await List.findByIdAndDelete(listId);
  
      return "List deleted successfully";
    }
  
    throw new AuthenticationError(
      "You must be logged in to delete a list"
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
