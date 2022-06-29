export const userResolver = {
  Query: {
    user: async (_, { id }, { dataSources }) => dataSources.usersService.getUserById(id),
    jwt: async (_, { email, password }, { dataSources }) => dataSources
      .usersService.login(email, password),
  },
  Mutation: {
    register: async (_, { user }, { dataSources }) => {
      const newUser = { ...user };
      return dataSources.usersService.register(newUser);
    },
  },
};
