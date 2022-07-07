export const userResolver = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      const res = await dataSources.userService.getUserById(id);
      return res;
    },
    jwt: async (_, { email, password }, { dataSources }) => {
      const res = await dataSources.userService.login(email, password);
      return res;
    },
  },
  Mutation: {
    register: async (_, { user }, { dataSources }) => {
      const newUser = { ...user };
      return dataSources.userService.register(newUser);
    },
  },
};
