let profile = {
  name: 'Jaina',
  lastname: 'Proudmoore',
  title: 'Lady',
  gender: 'F',
  address: 'Proudmoore Keep',
  city: 'Boralus',
  province: 'Tiragarde Sound',
  country: 'Kultiras',
  phone: '550011228963',
  email: 'ladyjaina@forthealliance.com',
}

let wallet = {
  balance: 800,
  cards: [
    { id: 1, brand: 'Visa', number: '0016' },
    { id: 2, brand: 'Mastercard', number: '1522' },
  ],
}

const catalog = [
  {
    id: 0,
    title: 'Vingadores: Ultimato',
    year: 2019,
    description: 'After the devastating events of Vingadores: Guerra Infinita (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to undo Thanos actions and restore order to the universe.',
    price: 29.9,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 1,
    title: 'The White Crow',
    year: 2018,
    description: 'The story of Rudolf Nureyev\'s defection to the West',
    price: 19,
    poster: 'https://m.media-amazon.com/images/M/MV5BNGIwMjFmMGQtZjYxNC00NmJjLTlkM2QtMWMyZTA3YjZhNzBlXkEyXkFqcGdeQXVyOTgxNDIzMTY@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 2,
    title: 'Be Natural: A História não Contada da Primeira Cineasta do Mundo',
    year: 2018,
    description: 'Pamela B. Green\'s energetic film about pioneer filmmaker Alice Guy-Blaché is both a tribute and a detective story, tracing the circumstances by which this extraordinary artist faded from memory and the path toward her reclamation.',
    price: 19,
    poster: 'https://m.media-amazon.com/images/M/MV5BYzQwMTRmOGMtZjZiZi00ZTEyLTllYTAtN2ExMzRhMzMwNjU4XkEyXkFqcGdeQXVyMjI3NDAyNg@@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 3,
    title: 'Shazam!',
    year: 2019,
    description: 'We all have a superhero inside us, it just takes a bit of magic to bring it out. In Billy Batson\'s case, by shouting out one word - SHAZAM. - this streetwise fourteen-year-old foster kid can turn into the grown-up superhero Shazam.',
    price: 29,
    poster: 'https://m.media-amazon.com/images/M/MV5BYTE0Yjc1NzUtMjFjMC00Y2I3LTg3NGYtNGRlMGJhYThjMTJmXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 4,
    title: 'Cemitério Maldito!',
    year: 2019,
    description: 'Dr. Louis Creed and his wife, Rachel, relocate from Boston to rural Maine with their two young children. The couple soon discover a mysterious burial ground hidden deep in the woods near their new home.',
    price: 25,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjUyNjg1ODIwMl5BMl5BanBnXkFtZTgwNjMyOTYzNzM@._V1_UX140_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 5,
    title: 'Dumbo!',
    year: 2019,
    description: 'A young elephant, whose oversized ears enable him to fly, helps save a struggling circus, but when the circus plans a new venture, Dumbo and his friends discover dark secrets beneath its shiny veneer.',
    price: 19,
    poster: 'https://m.media-amazon.com/images/M/MV5BNjMxMDE0MDI1Ml5BMl5BanBnXkFtZTgwMzExNTU3NjM@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 6,
    title: 'Nós',
    year: 2019,
    description: 'A family\'s serene beach vacation turns to chaos when their doppelgängers appear and begin to terrorize them.',
    price: 23,
    poster: 'https://m.media-amazon.com/images/M/MV5BZTliNWJhM2YtNDc1MC00YTk1LWE2MGYtZmE4M2Y5ODdlNzQzXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_UX140_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 7,
    title: 'Capitã Marvel (2019)',
    year: 2019,
    description: 'Carol Danvers becomes one of the universe\'s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.',
    price: 29.9,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 8,
    title: 'The Best of Enemies',
    year: 2019,
    description: 'Civil rights activist Ann Atwater faces off against C.P. Ellis, Exalted Cyclops of the Ku Klux Klan, in 1971 Durham, North Carolina over the issue of school integration.',
    price: 29.9,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjQ5MjA2NDkyM15BMl5BanBnXkFtZTgwNTIwNjUzNzM@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 9,
    title: 'A Cinco Passos de Você',
    year: 2019,
    description: 'A pair of teenagers with cystic fibrosis meet in a hospital and fall in love, though their disease means they must avoid close physical contact.',
    price: 19.9,
    poster: 'https://m.media-amazon.com/images/M/MV5BNzVmMjJlN2MtNWQ4Ny00Zjc2LWJjYTgtYjJiNGM5MTM1ZTlkXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 10,
    title: 'Unplanned',
    year: 2019,
    description: 'Abby Johnson is one of the youngest Planned Parenthood directors in the US. After she is asked to assist in an abortion at thirteen weeks gestation she instead resigns, becoming a pro-life activist.',
    price: 19.9,
    poster: 'https://m.media-amazon.com/images/M/MV5BZjBiZjEwNDUtNGIzOS00NTI3LWI5OGMtZDZjMjZhZGNhZDhkXkEyXkFqcGdeQXVyNTQ3MjE4NTU@._V1_UY209_CR1,0,140,209_AL_.jpg',
  },
  {
    id: 11,
    title: 'O Parque dos Sonhos',
    year: 2019,
    description: 'Wonder Park tells the story of an amusement park where the imagination of a wildly creative girl named June comes alive.',
    price: 24.9,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjI5MTQ5NzE4Nl5BMl5BanBnXkFtZTgwNTk2MDA5NjM@._V1_UX140_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 12,
    title: 'Como Treinar o Seu Dragão 3',
    year: 2019,
    description: 'When Hiccup discovers Toothless isn\'t the only Night Fury, he must seek "The Hidden World", a secret Dragon Utopia before a hired tyrant named Grimmel finds it first.',
    price: 24.9,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjIwMDIwNjAyOF5BMl5BanBnXkFtZTgwNDE1MDc2NTM@._V1_UX140_CR0,0,140,209_AL_.jpg',
  },
]

export const getProfile = () => profile
export const updateProfile = updated => profile = { ...profile, ...updated }

export const getWallet = () => wallet
export const updateWallet = updated => wallet = { ...wallet, ...updated }

export const getCatalog = () => catalog
