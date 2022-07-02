import { IArtistResponse } from '../../artists/artist.interface';
import { IMember } from '../band.interface';

export const bandResolver = {
  Query: {
    band: async (_, { id }, { dataSources }) => dataSources.bandService.getBandById(id),
    bands: async (_, __, { dataSources }) => dataSources.bandService.getAllBands(),
  },
  Mutation: {
    createBand: async (_, { band }, { dataSources }) => {
      const newBand = { ...band };
      return dataSources.bandService.createBand(newBand);
    },
    updateBand: async (_, { id, band }, { dataSources }) => {
      const newBand = { ...band };
      return dataSources.bandService.updateBand(id, newBand);
    },
    deleteBand: async (_, { id }, { dataSources }) => dataSources.bandService.deleteBand(id),
  },
  Band: {
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
