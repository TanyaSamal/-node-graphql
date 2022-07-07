import { IArtistResponse } from '../../artists/artist.interface';
import { IMember } from '../band.interface';

export const bandResolver = {
  Query: {
    band: async (_, { id }, { dataSources }) => {
      const res = await dataSources.bandService.getBandById(id);
      return res;
    },
    bands: async (_, { limit, offset }, { dataSources }) => {
      const res = await dataSources.bandService.getAllBands(limit, offset);
      return res;
    },
  },
  Mutation: {
    createBand: async (_, { band }, { dataSources }) => {
      const newBand = { ...band };
      const res = await dataSources.bandService.createBand(newBand);
      return res;
    },
    updateBand: async (_, { id, band }, { dataSources }) => {
      const newBand = { ...band };
      const res = await dataSources.bandService.updateBand(id, newBand);
      return res;
    },
    deleteBand: async (_, { id }, { dataSources }) => {
      const res = await dataSources.bandService.deleteBand(id);
      return res;
    },
  },
  Band: {
    id: (parent) => parent._id,
    genres: async ({ genresIds }, _, { dataSources }) => {
      const res = await Promise.all(genresIds
        .map((genreId) => dataSources.genreService.getGenreById(genreId)));
      return res;
    },
    members: async ({ members }, _, { dataSources }) => {
      const res: IArtistResponse[] = await Promise.all(members
        .map((member: IMember) => dataSources.artistService.getArtistById(member._id)));

      return res.map((artist: IArtistResponse, idx: number) => ({
        id: artist.id,
        artist: `${artist.firstName} ${artist.middleName ? artist.middleName : ''} ${artist.secondName}`,
        instrument: members[idx].instrument,
        years: members[idx].years,
      }));
    },
  },
};
