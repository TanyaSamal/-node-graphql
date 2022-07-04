export const genreResolver = {
  Query: {
    genre: async (_, { id }, { dataSources }) => {
      const res = await dataSources.genreService.getGenreById(id);
      return res;
    },
    genres: async (_, { limit, offset }, { dataSources }) => {
      const res = await dataSources.genreService.getAllGenres(limit, offset);
      return res;
    },
  },
  Mutation: {
    createGenre: async (_, { genre }, { dataSources }) => {
      const newGenre = { ...genre };
      const res = await dataSources.genreService.createGenre(newGenre);
      return res;
    },
    updateGenre: async (_, { id, genre }, { dataSources }) => {
      const newGenre = { ...genre };
      const res = await dataSources.genreService.updateGenre(id, newGenre);
      return res;
    },
    deleteGenre: async (_, { id }, { dataSources }) => {
      const res = await dataSources.genreService.deleteGenre(id);
      return res;
    },
  },
  Genre: {
    id: (parent) => parent._id,
  },
};
