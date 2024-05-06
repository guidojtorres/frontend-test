import { JsonDB, Config } from "node-json-db";

export default async function handler(req, res) {
  const db = new JsonDB(new Config("db", true, false, "/"));
  if (req.method === "GET") {
    try {
      var data = await db.getData("/catchedPokemon");
    } catch (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const newPokemon = {
      id: req.body.id,
      name: req.body.name,
    };

    const index = await db.getIndex("/catchedPokemon", Number(newPokemon.id));

    if (index === -1) {
      try {
        await db.push("/catchedPokemon[]", newPokemon);
      } catch (error) {
        return res.status(500).json({ error });
      }
      return res.status(200).json(newPokemon);
    } else {
      return res.status(409).send("Pokemon ya existente");
    }
  }
  return res.status(405).send("Method not allowed.");
}
