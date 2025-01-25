import {useState} from "react";
import Search from "./components/Search.jsx";

function App() {

    const [searchText, setSearchText] = useState('')

  return (
      <main>
          <div className="pattern"/>

          <div className="wrapper">
              <header>
                  <img src="hero.png" alt="Hero Banner" />
                  <h1>Find <span className="text-gradient">Movies</span> You&#39;ll Enjoy Without the Hassle</h1>
              </header>

              <Search searchText={searchText} setSearchText={setSearchText} />
          </div>
      </main>
  )
}

export default App
