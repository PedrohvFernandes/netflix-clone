import React, { useEffect } from 'react'
import './Nav.css'
export default function Nav() {
  const [show, setShow] = React.useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setShow(window.scrollY > 100);
    })

    // Pra remover esse evento quando ele fecha a pagina ou quando ele termina de carregar ou quando esse componente é destruido.Porque ai a gente tem esse evento nesse componente e talvez o outro não precise e quando fecha ele continua no window e isso pode ser ruim.
    // return () => {
    //   window.removeEventListener('scroll')
    // }
  }, [])

  return (
    <div className={`nav-container ${show && "nav-container-black"}`}>
      <a 
      href="https://www.netflix.com/br/"
      target='_blank'
      rel="noreferrer noopener"
      >
        <img
          className="nav-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
        />
      </a>
      <img
        className="nav-avatar"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPsVAeFlYeYOEUzb3TV1ML91_LPkkFML5lRQcMdr9nQu2CqO-WzT-RLmkM5_cOKvkaBkI&usqp=CAU"
        alt="Imagem do avatar do usuário logado"
      />
    </div>
  )
}
