import {useState, useEffect} from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import throttle from 'lodash.throttle'
import tailwindConfig from '../../tailwind.config'

const findKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value)

const getDeviceConfig = (width) => {
  const fullConfig = resolveConfig(tailwindConfig)
  const {screens} = fullConfig.theme

  const bpSizes = Object.keys(screens).map((screenSize) => parseInt(screens[screenSize]))

  const bpShapes = bpSizes.map((size, index) => ({
    min: !index ? 0 : bpSizes[index - 1],
    max: size,
    key: findKeyByValue(screens, `${size}px`),
  }))

  let breakpoint = null

  bpShapes.forEach((shape) => {
    if (!shape.min && width < shape.max) {
      breakpoint = shape.key
    } else if (width >= shape.min && width < shape.max) {
      breakpoint = shape.key
    } else if (!shape.max && width >= shape.max) {
      breakpoint = shape.key
    }
  })

  return breakpoint
}

export default () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 0

  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(width))

  useEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(width))
    }, 200)
    window.addEventListener('resize', calcInnerWidth)
    return () => window.removeEventListener('resize', calcInnerWidth)
  }, [])

  return brkPnt
}
