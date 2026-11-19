import { useState } from 'react'
import { PALABRAS } from './palabras'

function App() {

  const [palabraRandom, setPalabraRandom] = useState('')
  const [palabraAdivinada, setPalabraAdivinada] = useState([])
  const [error, setError] = useState(0)
  const [resultado, setResultado] = useState('')
  const [letrasUsadas, setLetrasUsadas] = useState([])

  // Iniciar una nueva partida
  function empezar() {

    const nuevaPalabra =
      PALABRAS[Math.floor(Math.random() * PALABRAS.length)]

    const palabra = nuevaPalabra.toUpperCase()

    setPalabraRandom(palabra)
    setPalabraAdivinada(Array(palabra.length).fill('_'))
    setError(0)
    setResultado('')
    setLetrasUsadas([])
  }

  // Comprobar la letra seleccionada
  function pulsar(valor) {

    if (resultado !== '' || letrasUsadas.includes(valor)) return

    setLetrasUsadas([...letrasUsadas, valor])

    if (palabraRandom.includes(valor)) {

      const nuevaPalabraAdivinada = [...palabraAdivinada]

      for (let i = 0; i < palabraRandom.length; i++) {

        if (palabraRandom[i] === valor) {
          nuevaPalabraAdivinada[i] = valor
        }
      }

      setPalabraAdivinada(nuevaPalabraAdivinada)

      // Comprobar si se ha adivinado la palabra
      if (nuevaPalabraAdivinada.join('') === palabraRandom) {
        setResultado('ganado')
      }

    } else {

      const nuevosErrores = error + 1

      setError(nuevosErrores)

      // Comprobar si se han agotado los intentos
      if (nuevosErrores >= 6) {
        setResultado('perdido')
      }
    }
  }

  return (

    <div className="h-screen w-full flex items-center justify-center">

      <div className="
        relative
        w-full h-full
        sm:h-[94vh] sm:max-w-4xl
        bg-white sm:rounded-3xl
        sm:shadow-2xl sm:border-4 sm:border-yellow-300
        flex flex-col overflow-hidden
      ">

        {/* CABECERA */}
        <header className="
          shrink-0 text-center
          bg-yellow-300
          px-2 py-1.5 sm:py-2
        ">

          <h1 className="
            text-2xl sm:text-4xl
            font-black text-purple-700
          ">
            🎮 ¡El Ahorcado!
          </h1>

          <p className="
            text-xs sm:text-sm
            font-bold text-purple-600
          ">
            ¿Puedes descubrir la palabra?
          </p>

          <button
            onClick={empezar}
            className="
              mt-1.5
              px-5 py-1.5 sm:px-7 sm:py-2
              bg-green-500 text-white
              font-black text-sm sm:text-base
              rounded-xl
              border-b-4 border-green-700
              shadow-md
              transition-all
              hover:bg-green-400
              hover:scale-105
              hover:-translate-y-0.5
              active:translate-y-1
              active:border-b-0
            "
          >
            🚀 ¡Empezar!
          </button>

        </header>

        {/* JUEGO */}
        {palabraRandom !== '' && (

          <main className="
            relative
            flex-1 min-h-0
            flex flex-col items-center
            px-2 py-2
            sm:px-6 sm:py-2
          ">

            {/* PALABRA */}
            <section className="text-center shrink-0">

              <div className="
                mt-1
                text-xl sm:text-3xl
                font-black
                tracking-[0.2em]
                text-purple-700
              ">
                {palabraAdivinada.join(' ')}
              </div>

            </section>

            {/* AHORCADO */}
            <section className="
              flex flex-col items-center
              shrink-0 mt-1
            ">

              <svg
                className="
                  w-[110px] h-[125px]
                  sm:w-[160px] sm:h-[180px]
                  bg-sky-50
                  rounded-2xl
                  border-2 border-sky-200
                  shadow
                "
                viewBox="0 0 200 250"
              >

                <line
                  x1="10" y1="240"
                  x2="150" y2="240"
                  stroke="#475569"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <line
                  x1="40" y1="240"
                  x2="40" y2="20"
                  stroke="#475569"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <line
                  x1="40" y1="20"
                  x2="120" y2="20"
                  stroke="#475569"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <line
                  x1="120" y1="20"
                  x2="120" y2="50"
                  stroke="#475569"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <circle
                  className={error >= 1 ? '' : 'hidden'}
                  cx="120" cy="70" r="20"
                  stroke="#7c3aed"
                  strokeWidth="5"
                  fill="#fef3c7"
                />

                <line
                  className={error >= 2 ? '' : 'hidden'}
                  x1="120" y1="90"
                  x2="120" y2="150"
                  stroke="#7c3aed"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <line
                  className={error >= 3 ? '' : 'hidden'}
                  x1="120" y1="110"
                  x2="90" y2="130"
                  stroke="#7c3aed"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <line
                  className={error >= 4 ? '' : 'hidden'}
                  x1="120" y1="110"
                  x2="150" y2="130"
                  stroke="#7c3aed"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <line
                  className={error >= 5 ? '' : 'hidden'}
                  x1="120" y1="150"
                  x2="90" y2="190"
                  stroke="#7c3aed"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <line
                  className={error >= 6 ? '' : 'hidden'}
                  x1="120" y1="150"
                  x2="150" y2="190"
                  stroke="#7c3aed"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

              </svg>

              <div className="
                mt-1
                px-3 py-0.5
                bg-red-100
                rounded-full
                font-black
                text-red-600
                text-xs
              ">
                ❌ {error}/6
              </div>

            </section>

            {/* TECLADO */}
            <footer className="
              w-full max-w-xl
              flex flex-wrap justify-center
              gap-1 sm:gap-1
              shrink-0 mt-1.5
            ">

              {'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').map((letra) => (

                <button
                  key={letra}
                  onClick={() => pulsar(letra)}
                  disabled={letrasUsadas.includes(letra) || resultado !== ''}
                  className={`
                    w-8 h-8 sm:w-10 sm:h-10
                    font-black rounded-lg
                    shadow border-b-4
                    transition-colors
                    ${letrasUsadas.includes(letra)
                      ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
                      : 'bg-purple-500 text-white border-purple-700 hover:bg-purple-400'
                    }
                  `}
                >
                  {letra}
                </button>

              ))}

            </footer>

            {/* RESULTADO */}
            <div className={`
              absolute inset-0
              z-50
              ${resultado ? 'flex' : 'hidden'}
              items-center justify-center
              bg-black/50
              backdrop-blur-sm
            `}>

              <div className="
                bg-white rounded-3xl
                p-6 text-center
                shadow-2xl
              ">

                <h2 className="text-3xl font-black text-purple-700">
                  {resultado === 'ganado' ? '🎉 ¡Has ganado!' : '😢 ¡Has perdido!'}
                </h2>

                <p className="mt-3 font-bold text-gray-700">
                  La palabra era: {palabraRandom}
                </p>

                <button
                  onClick={empezar}
                  className="
                    mt-5 px-6 py-2
                    bg-green-500 text-white
                    font-black rounded-xl
                    border-b-4 border-green-700
                  "
                >
                  🔄 Volver a jugar
                </button>

              </div>

            </div>

          </main>

        )}

      </div>

    </div>
  )
}

export default App