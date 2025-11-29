import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [promiseResult, setPromiseResult] = useState("");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London");
  const [githubUser, setGithubUser] = useState(null);
  const [username, setUsername] = useState("ar-uk");

  const simplePromise = () => {
    const p = new Promise((resolve) => {
      setTimeout(() => resolve("Promise done"), 1000);
    });

    p.then((result) => setPromiseResult(result));
  };

  const fetchWeather = () => {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6d8763285004e145b8d7ffced8ab0fe2`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setWeather(data));
  };

  const fetchGithubUser = async () => {
    const url = `https://api.github.com/users/${username}`;
    const response = await axios.get(url);
    setGithubUser(response.data);
  };

  useEffect(() => {
    simplePromise();
  }, []);

  const showData = (data) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Chapter 10</h1>

      <h2>Promise</h2>
      <div>{promiseResult}</div>

      <h2>OpenWeather API</h2>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>CHeck</button>
      {weather && (
        <div>
          <div>{weather.name}</div>
          <div>{weather.main.temp}Celcius</div>
        </div>
      )}

      {weather && (
        <>
          <div>{weather.name}</div>
          <div>{weather.main.temp}Celcius</div>

          {showData(weather)}
        </>
      )}

      <h2>GitHub API (Axios + async/await)</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchGithubUser}>check</button>
      {githubUser && (
        <div>
          <div>{githubUser.name}</div>
          <div>{githubUser.bio}</div>
        </div>
      )}

      {githubUser && (
        <>
          <div>{githubUser.name}</div>
          <div>{githubUser.bio}</div>

          {showData(githubUser)}
        </>
      )}

    </div>
  );
}
