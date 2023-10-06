import { useState, FormEvent } from 'react'
import './App.css'
import logoImg from './assets/logo.png'

/*
  Calculo: alcool / gasolina
  Se o resultado for menor que 0.7 compensa usar alcool
*/

interface InfoProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {

  const [gasolinaInput, setGasolinaInput] = useState('')
  const [alcoolInput, setAlcoolInput] = useState('')
  const [info, setInfo] = useState<InfoProps>()
  
  function calcular(event: FormEvent){
    event.preventDefault();

    console.log(typeof(alcoolInput), '=', alcoolInput)
    console.log(typeof(Number(alcoolInput)), '=', Number(alcoolInput))
    console.log('=================')

    let calculo = (Number(alcoolInput) / Number(gasolinaInput))

    console.log(calculo)
    console.log(alcoolInput)
    console.log(gasolinaInput)

    if(calculo <= 0.7){
      setInfo({
        title: "Compensar usar Álcool",
        gasolina: formatarMoeda(Number(gasolinaInput)),
        alcool: formatarMoeda(Number(alcoolInput)),
      })
    }else {
      setInfo({
        title: "Compensar usar Gasolina",
        gasolina: formatarMoeda(Number(gasolinaInput)),
        alcool: formatarMoeda(Number(alcoolInput)),
      })
    }

  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    return valorFormatado
  }

  return (
    <>
      <main className='container'>
        <img src={logoImg} alt='Logo da calculadora de gasolina ou alcool' />
        
        <h1 className='title'>Qual melhor opção?</h1>

        <form className='form' onSubmit={calcular}>
          <label>Álcool (Preço por litro)</label>
          <input className='input' type='number' placeholder='4,90' 
            min='1' step='0.01' required value={alcoolInput} 
            onChange={(e) => setAlcoolInput(e.target.value)}
          />

          <label>Gasolina (Preço por litro)</label>
          <input className='input' type='number' placeholder='6' 
          min='1' step='0.01' required value={gasolinaInput} 
          onChange={(e) => setGasolinaInput(e.target.value)}
          />

          <input className='button' type="submit" value='Calcular' />

        </form>

        {info && Object.keys(info).length > 0 && (
          <section className='result'>
          <h2 className='result-title'>{info.title}</h2>

          <span>Álcool  {info?.alcool}</span>
          <span>Gasolina {info?.gasolina}</span>
        </section>
        )}
        
      </main>
    </>
  )
}

export default App
