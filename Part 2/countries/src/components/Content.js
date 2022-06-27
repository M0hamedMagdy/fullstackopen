import Country from "./Country";

function Content({ countries, setCountries }) {
  if (countries.length > 10) {
    return <p>Too many matches</p>;
  } else if (
    (countries.length > 2 && countries.length < 10) ||
    countries.length === 0
  ) {
    return (
      <ul>
        {countries.map((country, i) => (
          <li key={i}>
            {" "}
            {country.name}
            <button onClick={() => setCountries([country])}>show</button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <Country country={countries[0]} />;
  }
}

export default Content;
