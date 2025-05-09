"use client";

import { useEffect, useState } from "react";

export default function UnityGame() {
  // Şimdilik sadece Unity logosu gösterilecek
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#222",
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg"
        alt="Unity Logo"
        style={{ width: 120, height: 120, opacity: 0.7 }}
      />
    </div>
  );
}
