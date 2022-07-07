# RSSchool NodeJS GraphQL task

## Installation
```bash
git clone https://github.com/TanyaSamal/node-graphql
cd node-graphqll
git checkout develop
npm install
```

## Microservices
Repository with microservices [here](https://github.com/rolling-scopes-school/node-graphql-service)
Make sure that you have the latest version of this repository!

## Usage
Start microservices
```bash
npm run run: all
```
Start backend
```bash
npm run start
```

## Content
- [Users](#Users)
- [Genres](#Genres)
- [Bands](#Bands)
- [Artists](#Artists)
- [Tracks](#Tracks)
- [Albums](#Albums)
- [Favourites](#Favourites)

<a name="Users"></a>

### Users

1. Register user:
<details>
  <summary>Example</summary>

```graphql
input InputUser {
  firstName: String!
  lastName: String!
  password: String!
  email: String!
}

mutation Mutation($user: InputUser!) {
  register(user: {
    firstName: "User"
    lastName: "First"
    password: "118649qwe"
    email: "test@mail.ru"
  }) {
    id
    firstName
    lastName
    password
    email
  }
}
```
</details>


2. Get user by id:
<details>
  <summary>Example</summary>

```graphql
query Query($userId: ID!) {
  user(id: "62bcb1ad5f60b1d3d01816ab") {
    id
    firstName
    lastName
    password
    email
  }
}
```
</details>

3. Get token:
<details>
  <summary>Example</summary>

```graphql
query Query($email: String!, $password: String!) {
  jwt(email: "test@mail.ru", password: "118649qwe") {
    jwt
  }
}
```
</details>

Set received token in Authorization header for all mutations.

<a name="Genres"></a>

### Genres

1. Create genre:
<details>
  <summary>Example</summary>

```graphql
input InputGenre {
  name: String!
  description: String
  country: String
  year: Int
}

mutation Mutation($genre: InputGenre!) {
  createGenre(genre: {
    name: "POP"
    description: "POP music"
    country: "USA"
    year: 1950
  }) {
    id
    name
    description
    country
    year
  }
}
```
</details>

2. Get genre by id:
<details>
  <summary>Example</summary>

```graphql
query Query($genreId: ID!) {
  genre(id: "62bda2306c4d3e926ba62f01") {
    id
    name
    description
    country
    year
  }
}
```
</details>

3. Get all genres (you can set limit and offset params or use default values)
<details>
  <summary>Example</summary>

```graphql
query Query {
  genres(limit: 5, offset: 0) {
    name
  }
}
```

or

```graphql
query Query {
  genres {
    name
  }
}
```
</details>

4. Update genre
<details>
  <summary>Example</summary>

```graphql
mutation Mutation($updateGenreId: ID!, $genre: InputGenre!) {
  updateGenre(id: "62bda2306c4d3e926ba62f01", genre: {
    name: "POP name"
    description: "POP music description"
    country: "USA"
    year: 1950
  }) {
    name
    description
  }
}
```
</details>

5. Delete genre
<details>
  <summary>Example</summary>

```graphql
mutation DeleteGenre($deleteGenreId: ID!) {
  deleteGenre(id: "62bda2306c4d3e926ba62f01") {
    acknowledged
    deletedCount
  }
}
```
</details>

<a name="Artists"></a>

### Artists

1. Create artist:
<details>
  <summary>Example</summary>

```graphql
input InputArtist {
  firstName: String!
  secondName: String!
  middleName: String
  birthDate: String
  birthPlace: String
  bandsIds: [String]
  country: String
  instruments: [String]
}

mutation Mutation($artist: InputArtist!) {
  createArtist(artist: {
    firstName: "Angus"
    secondName: "Young"
    birthPlace: "Glazgo"
    country: "Scotland"
    instruments: ["guitar"]
  }) {
    firstName
    secondName
    country
    instruments
  }
}
```
</details>

2. Get artist by id:
<details>
  <summary>Example</summary>

```graphql
query Query($artistId: ID!) {
  artist(id: "62bee18a3a6bcb16105a6496") {
    firstName
    secondName
    bands {
      name
      genres {
        name
      }
    }
    instruments
    birthPlace
  }
}
```
</details>

3. Get all artists:
<details>
  <summary>Example</summary>

```graphql
query Artists {
  artists {
    firstName
    secondName
    country
    bands {
      name
      members {
        artist
      }
    }
  }
}
```
</details>

4. Update artist:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation {
  updateArtist(id: "62bee18a3a6bcb16105a6496", artist: {
    firstName: "Angus"
    secondName: "Young"
    middleName: "McKinnon"
    birthPlace: "Glazgo"
    country: "Caledonia"
    bandsIds: ["62bf50b10ce42ab681c5a128"]
    instruments: ["guitar"]
  }) {
    firstName
    secondName
    middleName
    country
    bands {
      name
      members {
        artist
      }
      genres {
        name
      }
    }
    instruments
  }
}
```
</details>

5. Delete artist:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation($deleteArtistId: ID!) {
  deleteArtist(id: "62bee18a3a6bcb16105a6496") {
    acknowledged
    deletedCount
  }
}
```
</details>

<a name="Bands"></a>

### Bands

1. Create band:
<details>
  <summary>Example</summary>

```graphql
input InputBand {
  name: String!
  origin: String
  members: [MemberInput]
  website: String
  genresIds: [String]
}

input MemberInput {
  _id: ID
  artist: String
  instrument: String
  years: [String]
}

mutation Mutation($band: InputBand!) {
  createBand(band: {
    name: "AC/DC"
    origin: "USA"
    members: [{
      _id: "62bee18a3a6bcb16105a6496" // real artist id
      instrument: "guitar",
      years: ["1973"]
    }]
    website: "www.ac-dc.com"
    genresIds: ["62bee0683e447733fd3064b2"]
  }) {
    name
    members {
      artist
    }
    genres {
      name
    }
    id
  }
}
```
</details>

2. Get band by id:
<details>
  <summary>Example</summary>

```graphql
query Query($bandId: ID!) {
  band(id: "62bf50b10ce42ab681c5a128") {
    name
    members {
      artist
      instrument
    }
    genres {
      name
      description
    }
  }
}
```
</details>

3. Get all bands:
<details>
  <summary>Example</summary>

```graphql
query Query {
  bands {
    name
    id
    origin
    website
    members {
      artist
    }
    genres {
      name
    }
  }
}
```
</details>

4. Update band:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation($id: ID!, $band: InputBand!) {
  updateBand(id:"62bf50b10ce42ab681c5a128", band: {
    name: "AC/DC"
    origin: "United States"
    members: [{
      _id: "62bee18a3a6bcb16105a6496"
      instrument: "guitar",
      years: ["1973"]
    },
    {
      _id: "62bee2513a6bcb16105a6498"
      instrument: "drums",
      years: ["1976"]
    }]
    website: "www.acdc.com"
    genresIds: ["62bee0683e447733fd3064b2"]
  }) {
    name
    members {
      artist
    }
    genres {
      name
    }
    id
  }
}
```
</details>

5. Delete band:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation {
  deleteBand(id: "62bf50b10ce42ab681c5a128") {
    acknowledged
    deletedCount
  }
}
```
</details>

<a name="Tracks"></a>

### Tracks

1. Create track:
<details>
  <summary>Example</summary>

```graphql
input InputTrack {
  title: String!
  albumId: String
  bandsIds: [String]
  duration: Int
  released: Int
  genresIds: [String]
}

mutation Mutation($track: InputTrack!) {
  createTrack(track: {
    title: "Super track"
    bandsIds: ["62bf50b10ce42ab681c5a128"]
    duration: 200
    released: 2020
    genresIds: ["62bda2306c4d3e926ba62f01"]
  }) {
    title
    bands {
      name
    }
    duration
    released
    genres {
      name
    }
  }
}
```
</details>

2. Get track by id:
<details>
  <summary>Example</summary>

```graphql
query Query($trackId: ID!) {
  track(id: "62c1ed95056968eb4f3ad8ab") {
    title
    albums {
      name
      bands {
        name
        members {
          artist
        }
        genres {
          name
        }
      }
      tracks {
        title
      }
    }
  }
}
```
</details>

3. Get all tracks:
<details>
  <summary>Example</summary>

```graphql
query Query {
  tracks(limit: 10, offset: 0) {
    title
    genres {
      name
    }
    albums {
      name
    }
    bands {
      name
    }
  }
}
```
</details>

4. Update track:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation {
  updateTrack(id: "62c1ed95056968eb4f3ad8ab", track: {
    title: "New super track"
    bandsIds: ["62bf50b10ce42ab681c5a128"]
    albumId: "62c1f305a21e5d6fbaf122b4"
    duration: 220
    released: 2022
    genresIds: ["62bda2306c4d3e926ba62f01"]
  }) {
    title
    bands {
      name
    }
    duration
    released
    genres {
      name
    }
  }
}
```
</details>

5. Delete track:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation($deleteTrackId: ID!) {
  deleteTrack(id: "62c1ed95056968eb4f3ad8ab") {
    acknowledged
    deletedCount
  }
}
```
</details>

<a name="Albums"></a>

### Albums

1. Create album:
<details>
  <summary>Example</summary>

```graphql
input InputAlbum {
  name: String!
  released: Int
  artistsIds: [String]
  bandsIds: [String]
  trackIds: [String]
  genresIds: [String]
  image: String
}

mutation Mutation($album: InputAlbum!) {
  createAlbum(album: {
    name: "New album"
    released: 2020
    artistsIds: "62bee18a3a6bcb16105a6496"
    bandsIds: "62bf50b10ce42ab681c5a128"
    trackIds: "62c1ed95056968eb4f3ad8ab"
    genresIds: "62bda2306c4d3e926ba62f01"
  }) {
    name
    artists {
      firstName
      secondName
      bands {
        name
      }
    }
    bands {
      name
    }
    tracks {
      title
      albums {
        name
        artists {
          firstName
          secondName
        }
      }
    }
    genres {
      name
    }
  }
}
```
</details>

2. Get album by id:
<details>
  <summary>Example</summary>

```graphql
query Query($albumId: ID!) {
  album(id: "62c1f305a21e5d6fbaf122b4") {
    name
    released
    artists {
      firstName
      secondName
    }
    bands {
      name
      members {
        artist
      }
    }
    tracks {
      albums {
        name
      }
    }
    genres {
      name
    }
  }
}
```
</details>

3. Get all albums:
<details>
  <summary>Example</summary>

```graphql
query Query {
  albums(limit: 5, offset: 1) {
    name
  }
}
```
</details>

4. Update album:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation {
  updateAlbum(id: "62c1f305a21e5d6fbaf122b4", album: {
    name: "Super new album"
    released: 2022
    artistsIds: "62bee18a3a6bcb16105a6496"
    bandsIds: "62bf50b10ce42ab681c5a128"
    trackIds: "62c1ed95056968eb4f3ad8ab"
    genresIds: "62bda2306c4d3e926ba62f01"
  }) {
    name
    released
  }
}
```
</details>

5. Delete album:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation($deleteAlbumId: ID!) {
  deleteAlbum(id: "62c1f305a21e5d6fbaf122b4") {
    acknowledged
    deletedCount
  }
}
```
</details>

<a name="Favourites"></a>

### Favourites

1. Add Track to Favourites:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation($trackId: ID!) {
  addTrackToFavourites(trackId: "62c1eea0056968eb4f3ad8b1") {
    id
    userId
    tracks {
      title
      bands {
        name
      }
    }
  }
}
```
</details>

2. Add Band to Favourites:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation {
  addBandToFavourites(bandId: "62bf599d0ce42ab681c5a12c") {
    bands {
      name
    }
    tracks {
      title
      albums {
        name
      }
    }
    id
    userId
  }
}
```
</details>

3. Add Artist to Favourites:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation {
  addArtistToFavourites(artistId: "62c0a6cb46ccb486d3ca25ca") {
    id
    userId
    artists {
      firstName
      secondName
      bands {
        name
      }
    }
  }
}
```
</details>


4. Add Genre to Favourites:
<details>
  <summary>Example</summary>

```graphql
mutation Mutation {
  addGenreToFavourites(genreId: "62c2004c2bc91fc0ab78f7bb") {
    id
    userId
    genres {
      name
    }
    tracks {
      title
      genres {
        name
      }
    }
  }
}
```
</details>

5. Remove Track to Favourites (and others in the same way):
<details>
  <summary>Example</summary>

```graphql
mutation Mutation($trackId: ID!) {
  removeTrackToFavourites(trackId: "62c1ee64056968eb4f3ad8af") {
    id
    userId
    tracks {
      id
      title
    }
  }
}
```
</details>

6. Favourites:
<details>
  <summary>Example</summary>

```graphql
query Query {
  favourites {
    userId
    id
    bands {
      name
    }
    genres {
      name
    }
    artists {
      firstName
      secondName
    }
    tracks {
      title
    }
  }
}
```
</details>

## Author

👤 **Tanya Samal**

- Discord: `Tanya Samal(@tanyasamal)`

