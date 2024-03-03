import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required!");
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw new Error("User already exist");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("Error in signUp: ", error);
        throw new Error(err.message || "Internal server error");
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;

        if (!username || !password) throw new Error("All field reqs");

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (error) {
        console.error("Error in login:", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error in logout:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },

  Query: {
    authUser: async (_, __, context) => {
      try {
        // bu context içindeki getUser(), login, logout gibi metodlar built-in olarak var qraphql-passport documentationdan bakarsın
        const user = await context.getUser();

        return user;
      } catch (error) {
        console.error("Error in authUser: ", error);
        throw new Error("Internal server error");
      }
    },

    user: async (_, { userId }) => {
      try {
        const user = await User.findById({ userId });

        return user;
      } catch (error) {
        console.error("Error in user query:", error);
        throw new Error(error.message || "Error getting user");
      }
    },
  },
};

export default userResolver;
