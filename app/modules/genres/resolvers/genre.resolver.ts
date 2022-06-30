export const genreResolver = {
  Query: {
    genre: async (_, { id }, { dataSources }) => dataSources.genreService.getGenreById(id),
    genres: async (_, __, { dataSources }) => dataSources.genreService.getAllGenres(),
  },
  Mutation: {
    createGenre: async (_, { genre }, { dataSources }) => {
      const newGenre = { ...genre };
      return dataSources.genreService.createGenre(newGenre);
    },
    updateGenre: async (_, { id, genre }, { dataSources }) => {
      const newGenre = { ...genre };
      return dataSources.genreService.updateGenre(id, newGenre);
    },
    deleteGenre: async (_, { id }, { dataSources }) => dataSources.genreService.deleteGenre(id),
  },
};
