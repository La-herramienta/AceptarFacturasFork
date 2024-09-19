import getPool from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  try {
    const pool = await getPool();

    const IdFactura = searchParams?.get("IdFactura");

    console.log("Id", IdFactura);

    const ConfirmarFactura = await pool.request().input("IdFactura", IdFactura)
      .query(`
        UPDATE DISTRI_LA_HERRAMIENTA.dbo.idoctos
        SET estado = 'AC'
        WHERE ididoctos = @IdFactura
      `);

    return NextResponse.json(
      {
        body: "Factura Confirmada Correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { body: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
