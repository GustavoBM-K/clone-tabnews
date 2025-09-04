import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [noPosition, setNoPosition] = useState({ top: "0px", left: "0px" });
  const [moved, setMoved] = useState(false);
  const buttonsRef = useRef(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  const moveNoButton = () => {
    if (!buttonsRef.current) return;

    const container = buttonsRef.current;
    const button = document.getElementById("no-button");

    const maxLeft = container.offsetWidth - button.offsetWidth;
    const maxTop = container.offsetHeight - button.offsetHeight;

    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;

    setNoPosition({ top: top + "px", left: left + "px" });
    setMoved(true);
  };

  const handleYes = () => {
    alert("Eu sabia! ❤️ \nTe amo muito mais!");
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        textAlign:"center",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(to bottom, rgba(252, 215, 173, 1), rgba(251, 3, 91, 1))",
        gap: "1rem",
      }}
    >
      <h1 style={{ color: "white", fontSize: "3rem", marginBottom: "0.5rem" }}>
        Oi Mozi ❤️
      </h1>
      <p style={{ color: "white", fontSize: "1.5rem", marginBottom: "1.5rem" }}>
        Deixa eu te perguntar...
        Você me ama?
      </p>

      {/* container maior para mais espaço */}
      <div
        ref={buttonsRef}
        style={{
          display: "flex",
          gap: "1rem",
          position: "relative",
          width: "90%",
          maxWidth: "500px",
          height: "100px", // aumenta espaço vertical
          justifyContent: "center",
          textAlign:"center",
          alignItems: "center",
          border: "1px solid transparent", // só para manter o layout
        }}
      >
        <button
          onClick={handleYes}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            border: "1px solid rgba(0,0,0,0.3)", // borda mais suave
            borderRadius: "10px", // opcional, deixa mais arredondado
            boxShadow: "2px 2px 6px rgba(0,0,0,0.9)", // sombra sutil
            cursor: "pointer",
          }}
        >
          Sim
        </button>

        <button
          id="no-button"
          onMouseEnter={moveNoButton} // desktop
          onClick={moveNoButton}      // celular
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            border: "1px solid rgba(0,0,0,0.3)", // borda mais suave
            borderRadius: "10px", // opcional, deixa mais arredondado
            boxShadow: "2px 2px 6px rgba(0,0,0,0.9)", // sombra sutil
            transition: "top 0.3s, left 0.3s",
            position: moved ? "absolute" : "static",
            top: moved ? noPosition.top : undefined,
            left: moved ? noPosition.left : undefined,
          }}
        >
          Não
        </button>
      </div>
    </div>
  );
}
