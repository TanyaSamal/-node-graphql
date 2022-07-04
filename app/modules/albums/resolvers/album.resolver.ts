export const albumResolver = {
  Query: {
    album: async (_, { id }, { dataSources }) => {
      const res = await dataSources.albumService.getAlbumById(id);
      return res;
    },
    albums: async (_, { limit, offset }, { dataSources }) => {
      const res = await dataSources.albumService.getAllAlbums(limit, offset);
      return res;
    },
  },
  Mutation: {
    createAlbum: async (_, { album }, { dataSources }) => {
      const newAlbum = { ...album };
      const res = await dataSources.albumService.createAlbum(newAlbum);
      return res;
    },
    updateAlbum: async (_, { id, album }, { dataSources }) => {
      const newAlbum = { ...album };
      const res = await dataSources.albumService.updateAlbum(id, newAlbum);
      return res;
    },
    deleteAlbum: async (_, { id }, { dataSources }) => {
      const res = await dataSources.albumService.deleteAlbum(id);
      return res;
    },
  },
  Album: {
    id: (parent) => parent._id,
    artists: async ({ artistsIds }, _, { dataSources }) => {
      const res = await Promise.all(artistsIds
        .map((artistId) => dataSources.artistService.getArtistById(artistId)));
      return res;
    },
    bands: async ({ bandsIds }, _, { dataSources }) => {
      const res = await Promise.all(bandsIds
        .map((bandId) => dataSources.bandService.getBandById(bandId)));
      return res;
    },
    tracks: async ({ trackIds }, _, { dataSources }) => {
      const res = await Promise.all(trackIds
        .map((trackId) => dataSources.trackService.getTrackById(trackId)));
      return res;
    },
    genres: async ({ genresIds }, _, { dataSources }) => {
      const res = await Promise.all(genresIds
        .map((genreId) => dataSources.genreService.getGenreById(genreId)));
      return res;
    },
  },
};
