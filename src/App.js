import './App.css'
import Row from './components/Row'
import Banner from './components/Banner'
import Nav from './components/Nav'
import categories from './api'

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <Nav/>
      {/* Destaque */}
      <Banner/>
      {/* Em alta */}
      {/* Filmes de cada categoria */}
      {categories.map((category, index) => {
        // Key -> O index no react é usado para renderizar o item do array, quando é feito uma intereçao em cima de um componente, para não dar erro. Mas a gente pode usar o propio nome, porque ele nesse caso é unico
        return (
          <Row
            key={category.name}
            title={category.title}
            path={category.path}
            isLarge={category.isLarge}
          />
        )
      })}
    </div>
  )
}

export default App
