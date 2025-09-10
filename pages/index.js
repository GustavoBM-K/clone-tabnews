import { useEffect, useState, useRef } from "react";

export default function Home() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#0D1117",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          color: "#f0f6fc",
          display: "flex",
          backgroundColor: "#151B22",
          width: "100%",
          height: "4.5rem",
          fontWeight: "Bold",
          fontFamily: "sans-serif",
          justifyContent: "space-between",
          paddingLeft: "16px",
          paddingRight: "16px",
          alignItems: "center",
        }}
      >
        <nav
          style={{
            display: "flex",
            flex: "flex-wrap",
            alignItems: "center",
          }}
        >
          <a
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="32"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.9999 4C20.6568 4 21.9999 5.34315 21.9999 7V17C21.9999 18.6569 20.6568 20 18.9999 20H4.99994C3.34308 20 1.99994 18.6569 1.99994 17V7C1.99994 5.34315 3.34308 4 4.99994 4H18.9999ZM19.9999 9.62479H13C12.4478 9.62479 11.8442 9.20507 11.652 8.68732L10.6542 6H4.99994C4.44765 6 3.99994 6.44772 3.99994 7V17C3.99994 17.5523 4.44765 18 4.99994 18H18.9999C19.5522 18 19.9999 17.5523 19.9999 17V9.62479Z"
                fill="currentColor"
              ></path>
            </svg>
            <div style={{ paddingLeft: "1rem" }}>TabNews</div>

            <div style={{ paddingLeft: "1rem" }}>Relevantes</div>
          </a>
          <div>
            <a style={{ cursor: "pointer", paddingLeft: "1rem" }}>Recentes</a>
          </div>
        </nav>

        {/* --- lado direito --- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px", // espaço entre os itens
          }}
        >
          {/* barra de pesquisa */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#13161a",
              border: "1px solid #333",
              borderRadius: "6px",
              padding: "4px 8px",
              width: "300px",
              flexShrink: 0,
              height: "23px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              height="16"
              width="16"
              style={{ marginRight: "6px", color: "#aaa" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
            <input
              type="text"
              placeholder="Pesquisar"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#ddd",
                fontSize: "14px",
                height: "100%",
              }}
            />
          </div>

          {/* + */}
          <div
            style={{
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "normal",
            }}
          >
            +
          </div>

          {/* Contador azul */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "9px",
                height: "9px",
                backgroundColor: "#1d4ed8", // azul
                borderRadius: "3px",
              }}
            ></div>
            <span>0</span>
          </div>

          {/* Contador verde */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "9px",
                height: "9px",
                backgroundColor: "#22c55e", // verde
                borderRadius: "3px",
              }}
            ></div>
            <span>0</span>
          </div>

          {/* menu (três barrinhas) */}
          <div style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="25"
              height="25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </header>
    </div>
  );
}
