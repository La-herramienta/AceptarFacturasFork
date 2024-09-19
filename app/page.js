"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [FacturasPendientes, setFacturasPendientes] = useState([]);
  const [Loading, setLoading] = useState(true);

  const GetData = (Vende) => {
    fetch(`/api/FacturasPendientes?IdVendedor=${Vende?.idfvendedo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);

        setFacturasPendientes(data?.FacturasPendientes || []);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage?.Tercero && localStorage?.Vendedor) {
      const Vende = JSON.parse(localStorage.Vendedor);

      if (Vende?.idfvendedo) {
        GetData(Vende);
      }
    }
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Facturas pendientes por aprobar</CardTitle>
        </CardHeader>
        <CardContent>
          {Loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <Skeleton className="rounded-md w-full h-32" />
              </Card>
              <Card>
                <Skeleton className="rounded-md w-full h-32" />
              </Card>
              <Card>
                <Skeleton className="rounded-md w-full h-32" />
              </Card>
            </div>
          )}
          {!Loading && FacturasPendientes?.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FacturasPendientes?.map((factur, key) => {
                  // Convierte `factur.idofechaCreacion` a un objeto `Date`
                  const fechaCreacion = new Date(factur.idofechaCreacion);
                  // Formatea `idovalort` como moneda en pesos colombianos
                  const valorFormateado = new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                  }).format(factur.idovalort);

                  return (
                    <Card key={key}>
                      <CardHeader>
                        <CardTitle>
                          CT- {factur?.idonumero} - {valorFormateado}
                        </CardTitle>
                        <CardDescription>
                          {/* Aplica `toLocaleDateString` */}
                          {fechaCreacion.toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();

                            if (
                              confirm("Esta Seguro de confirmar esta factura ?")
                            ) {
                              const Vende = JSON.parse(localStorage.Vendedor);
                              fetch(
                                `/api/ConfirmarFactura?IdFactura=${factur?.ididoctos}`
                              )
                                .then((res) => res.json())
                                .then((data) => {
                                  alert(data?.body);
                                  GetData(Vende);
                                })
                                .catch((error) => {
                                  console.log("error", error);
                                  alert("Error al confirmar la factura");
                                })
                                .finally(() => {
                                  setLoading(false);
                                });
                            }
                          }}
                          variant=""
                        >
                          <Check />
                          Aceptar
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
