const fetch = require("node-fetch");

export const PersonQuery = {
  getPerson: async (_: unknown, { id }: { id: number }) => {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    return response.json();
  },
};
