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

  function flagemojiToPNG(flag) {
    if (!flag || flag.length < 2) return "";

    try {
      const countryCode = Array.from(flag, (char) => char.codePointAt(0))
        .map((code) => String.fromCharCode(code - 127397))
        .join("")
        .toLowerCase();

      return (
        <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
      );
    } catch (err) {
      console.error("Invalid flag:", err);
      return "";
    }
  }

  function Flag(countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode.toLocaleLowerCase()}.png`}
        alt={countryCode}
      />
    );
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, flagemojiToPNG, Flag }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
