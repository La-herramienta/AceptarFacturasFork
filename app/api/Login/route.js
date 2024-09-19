import getPool from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  try {
    const pool = await getPool();

    const Documento = searchParams?.get("Documento");

    const Tercero = await pool.request().input("Documento", Documento).query(`
      SELECT idctercero,fkctdocide,ctenumiden,ctenomcom,ctedirecc,ctetelefon,tiposTerceros,cteemail,ctenomcomer
      FROM CoTercero 
      WHERE ctenumiden = @Documento 
        AND (tiposTerceros LIKE '%VD%')
    `);

    if (Tercero.recordset === 0) {
      return NextResponse.json(
        { body: "No se encontró información para el tercero" },
        {
          status: 404,
        }
      );
    }
    const InfoTercero = Tercero.recordset[0];

    //Validar si tercero tiene información

    const Vendedor = await pool
      .request()
      .input("idctercero", InfoTercero?.idctercero).query(`
      SELECT *
      FROM DISTRI_LA_HERRAMIENTA.dbo.fvendedo 
      WHERE fvendedo.fkctercero = @idctercero 
    `);

    if (Vendedor?.recordset?.length === 0) {
      return NextResponse.json(
        { body: "No se encontró información para el vendedor" },
        {
          status: 404,
        }
      );
    }

    const InfoVendedor = Vendedor.recordset[0];

    return NextResponse.json(
      {
        Tercero: InfoTercero,
        Vendedor: InfoVendedor,
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
