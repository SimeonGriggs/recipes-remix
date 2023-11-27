import React from 'react'

type HeadingProps = {
  children: React.ReactNode
  className?: string
  as?: string
}

const classes = `text-caramel-800 font-display font-black uppercase mb-4 tracking-widest`

export default function Heading(props: HeadingProps) {
  const {className = '', children, as = 'h2'} = props

  if (as === 'h3') {
    return <h3 className={`${classes} text-sm ${className}`}>{children}</h3>
  }

  if (as === 'h1') {
    return <h1 className={`${classes} text-2xl ${className}`}>{children}</h1>
  }

  return <h2 className={`${classes} text-xl ${className}`}>{children}</h2>
}
