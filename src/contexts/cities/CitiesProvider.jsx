import { useState, useEffect } from "react";
import { CitiesContext } from "./CitiesContext";

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  function getFlagEmoji(input) {
    if (!input) return "";

    // 👉 Si c'est déjà un emoji → retourne tel quel
    if (input.length > 2) return input;

    // 👉 Sinon c'est un code pays
    return input
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt())
      .map((code) => String.fromCodePoint(code))
      .join("");
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        getFlagEmoji,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
