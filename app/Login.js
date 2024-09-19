"use client";
import React, { useState } from "react";

const Login = () => {
  const [Documento, setDocumento] = useState(null);
  const [Loading, setLoading] = useState(false);
  return (
    <div>
      <style jsx>
        {`
          .bg-image {
            background-image: url(https://i.postimg.cc/13pssvxG/bg-image.png);
          }
          .backdrop {
            backdrop-filter: blur(2px);
          }
        `}
      </style>
      <div className="h-screen w-full flex justify-center items-center bg-gradient-to-tr from-blue-900 to-blue-500">
        <div className="bg-image w-full sm:w-1/2 md:w-9/12 lg:w-1/2 mx-3 md:mx-5 lg:mx-0 shadow-md flex flex-col md:flex-row items-center rounded z-10 overflow-hidden bg-center bg-cover bg-blue-600">
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-opacity-25 bg-blue-600 backdrop">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white my-2 md:my-0 uppercase text-center">
              la Herramienta S.A.S
            </h1>
            <p className="mb-2 text-white hidden md:block font-mono">
              Valdar Facturas
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center bg-white py-5 md:py-8 px-4">
            <h3 className="mb-4 font-bold text-3xl flex items-center text-blue-500">
              LOGIN
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  localStorage.clear();
                  const response = await fetch(
                    `/api/Login?Documento=${Documento}`
                  );
                  const data = await response.json();

                  if (Object.keys(data?.Tercero).length == 0) {
                    alert("No se encontró información para el tercero");
                    return;
                  }
                  if (Object.keys(data?.Vendedor).length == 0) {
                    alert("No se encontró información para el tercero");
                    return;
                  }

                  localStorage.setItem(
                    "Tercero",
                    JSON.stringify(data?.Tercero)
                  );
                  localStorage.setItem(
                    "Vendedor",
                    JSON.stringify(data?.Vendedor)
                  );

                  console.log(data);
                } catch (error) {
                  alert("Error");
                } finally {
                  setLoading(false);
                }
              }}
              className="px-3 flex flex-col justify-center items-center w-full gap-3"
            >
              <input
                type="text"
                placeholder="Documento"
                name="Documento"
                id="Documento"
                onChange={(e) => setDocumento(e.target.value)}
                required
                className="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base    focus:outline-none text-black focus:border-blue-500"
              />

              <button
                disabled={Loading}
                type="submit"
                className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring rounded px-3 py-1"
              >
                <svg
                  className="w-5 h-5 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <p className="ml-1 text-lg">Ingresar</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
