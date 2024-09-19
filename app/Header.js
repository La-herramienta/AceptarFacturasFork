import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Header = ({ User, setUser }) => {
  return (
    <div className="w-full h-full mx-auto space-y-8">
      {/* component */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 justify-center items-center">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-10 h-10"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold">
              {User?.Tercero?.ctenomcomer ||
                User?.Tercero?.ctenomcomer?.ctenomcom}
            </h1>

            <h1 className="text-xl font-bold">
              Documento: {User?.Tercero?.ctenumiden}
            </h1>
          </div>
          <Button
            className=" w-full"
            onClick={() => {
              localStorage.removeItem("Tercero");
              localStorage.removeItem("Vendedor");
              setUser(null);
            }}
          >
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
