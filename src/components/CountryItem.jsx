import { useCities } from "../contexts/cities/useCities";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { getFlagEmoji } = useCities();

  return (
    <li className={styles.countryItem}>
      <span>{getFlagEmoji(country.countryCode)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
