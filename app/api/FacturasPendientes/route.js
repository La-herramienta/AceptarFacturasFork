import getPool from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  try {
    const pool = await getPool();

    const IdVendedor = searchParams?.get("IdVendedor");

    const Idoctos = await pool.request().input("idVendedor", IdVendedor).query(`
      SELECT i.ididoctos , i.idonumero,i.idofechaCreacion,i.idovalort FROM  DISTRI_LA_HERRAMIENTA.dbo.idoctos i  where i.fkfvendedo = @idVendedor and i.estado='PE'
    `);

    return NextResponse.json(
      {
        FacturasPendientes: Idoctos?.recordset || [],
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
