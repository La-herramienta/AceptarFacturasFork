"use client";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Header from "./Header";

const Main = ({ children }) => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    if (localStorage?.Tercero && localStorage?.Vendedor) {
      setUser({
        Tercero: JSON.parse(localStorage.Tercero),
        Vendedor: JSON.parse(localStorage.Vendedor),
      });
    }
  }, []);

  return (
    <div>
      {!User && <Login setUser={setUser} />}

      {User && (
        <section className="container mx-auto space-y-8">
          <Header setUser={setUser} User={User} />
          {children}
        </section>
      )}
    </div>
  );
};

export default Main;
