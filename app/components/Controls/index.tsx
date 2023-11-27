import React, {useState, useEffect} from 'react'
import {ChevronDownIcon} from '@heroicons/react/24/solid'

import Serves from './Serves'
import Toggle from './Toggle'
import useBreakpoint from '~/hooks/useBreakpoint'
import useStore from '~/hooks/useStore'

export default function Controls() {
  const size = useBreakpoint()
  const [showToggles, setShowToggles] = useState(false)
  useEffect(() => {
    if (size !== 'sm') {
      setShowToggles(false)
    }
  }, [size])

  const cup = useStore((state) => state.cup)
  const cupOptions = useStore((state) => state.cupOptions)
  const changeCup = useStore((state) => state.changeCup)
  const standard = useStore((state) => state.standard)
  const standardOptions = useStore((state) => state.standardOptions)
  const changeStandard = useStore((state) => state.changeStandard)
  const temperature = useStore((state) => state.temperature)
  const temperatureOptions = useStore((state) => state.temperatureOptions)
  const changeTemperature = useStore((state) => state.changeTemperature)

  return (
    <div className="sticky top-0 z-10 mb-8 flex w-full justify-center border-b border-caramel-200 bg-caramel-100 bg-opacity-90 py-1 font-display text-2xs font-black uppercase tracking-widest">
      <div className="flex w-full max-w-4xl items-center pl-2">
        <Serves />

        <button
          type="button"
          onClick={() => setShowToggles(!showToggles)}
          className={`my-1 ml-auto mr-2 flex items-center py-2 px-2 text-2xs font-black uppercase leading-none tracking-widest transition-colors duration-100 md:hidden 
            ${
              showToggles
                ? `text-caramel-900`
                : `text-caramel-500 hover:bg-white hover:text-caramel-600`
            }
          `}
        >
          {showToggles ? `Hide` : `Show`} Controls
          <ChevronDownIcon className={`${showToggles ? `rotate-180` : ``} h-auto  w-4 transform`} />
        </button>
        <div
          className={`ml-auto px-2 ${
            showToggles
              ? ` absolute top-full z-10 -ml-2 w-full border-t border-caramel-200 bg-white text-right`
              : `hidden`
          } divide-y divide-caramel-200 md:flex md:divide-x md:divide-y-0`}
        >
          <Toggle name="cups" current={cup} options={cupOptions} changeFunction={changeCup} />
          <Toggle
            name="standard"
            current={standard}
            options={standardOptions}
            changeFunction={changeStandard}
          />
          <Toggle
            name="temperature"
            current={temperature}
            options={temperatureOptions}
            changeFunction={changeTemperature}
          />
        </div>
      </div>
    </div>
  )
}
