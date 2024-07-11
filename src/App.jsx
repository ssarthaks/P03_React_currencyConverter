import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/UseCurrencyInfo'

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("npr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const resetOptions = () => {
    setAmount(0)
    setFrom("usd")
    setTo("npr")
    setConvertedAmount(0)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    // Background image div with tailwind css properties
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <h1 className="text-4xl text-slate-800 bg-slate-400 px-7 py-2 rounded-xl font-bold mb-8">Currency Converter</h1>
      <div className="flex w-3/4 space-x-8 justify-center">
        {/* Tea image in the left css */}
        <div className=" bg-slate-400/70 p-4 rounded-xl">
          <img className="rounded-xl h-96" src="https://images.pexels.com/photos/905485/pexels-photo-905485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sample" />
        </div>

        {/* Parent div of right box */}
        <div className=" bg-slate-400/70 p-4 rounded-xl flex items-center">
          <div className="w-full border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert()
              }}
            >
              {/* Input Box Div */}
              <div className="w-full mb-1">
                <InputBox
                  placeholderName="Enter Amount..."
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => {
                    setFrom(currency)
                  }}
                  selectCurrency={from}
                  onAmountChange={(amount) => {
                    setAmount(amount)
                  }}
                />
              </div>

              {/* Swap div */}
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>

              {/* Another inputbox css */}
              <div className="w-full mt-1 mb-4">
                <InputBox
                  placeholderName="Converted Amount..."
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => {
                    setTo(currency)
                  }}
                  selectCurrency={to}
                  amountDisable
                />
              </div>

              {/* Convert button css */}
              <button onClick={convert} type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>

              <button onClick={resetOptions} type="button" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-5">
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
      <p className="mt-10 text-md text-slate-800 bg-slate-400 px-7 py-2 rounded-xl font-bold mb-8">Powered by Vite, React, Custom Hooks, React Hooks-useEffect,useId,useState</p>
    </div>
  );
}

export default App;
