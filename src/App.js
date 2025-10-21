import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;


  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError("No results found.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Movie Search App</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie name..."
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {loading && <p style={styles.message}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.results}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={styles.card}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
              style={styles.poster}
            />
            <h3 style={styles.movieTitle}>{movie.Title}</h3>
            <p style={styles.year}>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "30px 20px",
    background:
      "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    minHeight: "100vh",
    color: "#fff",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "30px",
    background: "linear-gradient(45deg, #ff6b6b, #ffd93d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: "800",
    textShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
    letterSpacing: "-0.5px",
  },
  searchBox: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  input: {
    padding: "15px 20px",
    width: "min(400px, 70vw)",
    borderRadius: "50px",
    border: "none",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    fontSize: "1rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    outline: "none",
  },
  button: {
    padding: "15px 30px",
    background: "linear-gradient(45deg, #ff6b6b, #ff8e53)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  results: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "25px",
    marginTop: "40px",
    maxWidth: "1200px",
    margin: "40px auto 0",
    padding: "0 20px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "15px",
    padding: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    borderRadius: "10px",
    aspectRatio: "2/3",
    objectFit: "cover",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  },
  movieTitle: {
    margin: "15px 0 8px",
    fontSize: "1rem",
    fontWeight: "600",
    lineHeight: "1.3",
    overflow: "hidden",
  },
  year: {
    color: "#ffd93d",
    fontWeight: "500",
    fontSize: "0.9rem",
  },
  message: {
    fontSize: "1.3rem",
    marginTop: "30px",
    color: "#ffd93d",
    fontWeight: "500",
  },
  error: {
    color: "#ff6b6b",
    fontWeight: "600",
    fontSize: "1.1rem",
    background: "rgba(255, 107, 107, 0.1)",
    padding: "15px 25px",
    borderRadius: "50px",
    display: "inline-block",
    marginTop: "20px",
    backdropFilter: "blur(10px)",
  },
};

export default App;
