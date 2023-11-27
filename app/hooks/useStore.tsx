import create from 'zustand'

const cupOptions = ['Cups', 'Weight', 'Volume']
const standardOptions = ['Metric', 'Imperial']
const temperatureOptions = [
  {value: 'celsius', abbr: 'ºC'},
  {value: 'fahrenheit', abbr: 'ºF'},
]

type Store = {
  serves: number
  incrementServes: (increment: number) => void
  cup: string
  cupOptions: string[]
  changeCup: (cup: string) => void
  standard: string
  standardOptions: string[]
  changeStandard: (standard: string) => void
  temperature: string
  temperatureOptions: {value: string; abbr: string}[]
  changeTemperature: (temperature: string) => void
}

export default create<Store>((set) => ({
  // Serves
  serves: 1,
  incrementServes: (increment) => set((state) => ({serves: state.serves + increment})),

  // Cups
  cup: cupOptions[0],
  cupOptions,
  changeCup: (cup) => set(() => ({cup})),

  // Weights
  standard: standardOptions[0],
  standardOptions,
  changeStandard: (standard) => set(() => ({standard})),

  // Temperatures
  temperature: temperatureOptions[0].value,
  temperatureOptions,
  changeTemperature: (temperature) => set(() => ({temperature})),
}))
