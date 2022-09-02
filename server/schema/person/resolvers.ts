const fetch = require("node-fetch");

const resolveFilms = (parent: any) => {
  const promises = parent.films.map(async (url: string) => {
    const response = await fetch(url);
    return response.json();
  });

  return Promise.all(promises);
};

export const PersonResolvers = {
  Person: {
    homeworld: async (parent: any) => {
      const response = await fetch(parent.homeworld);
      return response.json();
    },
    films: resolveFilms,
  },
  Planet: {
    films: resolveFilms,
  },
};
