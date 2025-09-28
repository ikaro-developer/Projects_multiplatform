import type { Request, Response } from "express";
import connection from "../database/connection.js";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await connection("points")
      .join("point_itens", "points.id", "=", "point_itens.point_id")
      .whereIn("point_itens.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");
    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await connection("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found" });
    }
    const items = await connection("items")
      .join("point_itens", "items.id", "=", "point_itens.item_id")
      .where("point_itens.point_id", id);

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    const trx = await connection.transaction();
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body;

    const point = {
      image:
        "https://img.freepik.com/psd-gratuitas/colheita-vibrante-de-legumes-uma-colecao-colorida-de-produtos-frescos_191095-79960.jpg?semt=ais_incoming&w=740&q=80",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };
    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItens = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });
    await trx("point_itens").insert(pointItens);
    await trx.commit();
    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
