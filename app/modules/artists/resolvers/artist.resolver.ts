export const artistResolver = {
  Query: {
    artist: async (_, { id }, { dataSources }) => {
      const res = await dataSources.artistService.getArtistById(id);
      return res;
    },
    artists: async (_, __, { dataSources }) => {
      const res = await dataSources.artistService.getAllArtists();
      return res;
    },
  },
  Mutation: {
    createArtist: async (_, { artist }, { dataSources }) => {
      const newArtist = { ...artist };
      const res = await dataSources.artistService.createArtist(newArtist);
      return res;
    },
    updateArtist: async (_, { id, artist }, { dataSources }) => {
      const newArtist = { ...artist };
      const res = await dataSources.artistService.updateArtist(id, newArtist);
      return res;
    },
    deleteArtist: async (_, { id }, { dataSources }) => {
      const res = await dataSources.artistService.deleteArtist(id);
      return res;
    },
  },
  Artist: {
    id: (parent) => parent._id,
    bands: async (parent, _, { dataSources }) => {
      const res = await Promise.all(parent.bandsIds
        .map((bandId) => dataSources.bandService.getBandById(bandId)));
      return res;
    },
  },
};
