let id = 1;

const tracks = [];

tracks.map(t => ({
  id: `${id++}`,
  title: t.title,
  type: t.type || 'album',
  artists: t.artists.map(a => a.name),
  coverUri: t.coverUri.replace('%%', '400x400'),
  genre: t.genre,
  releaseDate: t.releaseDate,
  lyrics: '',
  duration: 0,
  price: 0.99,
  discount: 0
}));
