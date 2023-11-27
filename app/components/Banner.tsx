import React from 'react'

type BannerProps = {
  children: React.ReactNode
  category: string
  description: string
}

function Banner(props: BannerProps) {
  const {children, category, description} = props

  return (
    <div className="banner relative flex flex-col items-center justify-center overflow-hidden border-b border-caramel-200 px-4 py-4 pt-12 md:px-4 md:py-24">
      <div className="relative max-w-4xl">
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute inset-0 top-auto bg-white" style={{height: `70%`}} />
          <h1 className="relative text-center font-display text-2xl font-black uppercase tracking-mega text-caramel-800 sm:text-4xl md:text-6xl">
            {children}
          </h1>
        </div>
        <div className="relative flex flex-col items-center justify-center bg-white px-6 pb-6 md:px-12 md:pb-12">
          <div className="absolute inset-0 m-2 border border-caramel-300 md:m-4" />
          {category && (
            <div className="my-6 flex items-center md:my-12">
              <div className="w-6 border-t border-caramel-300 md:w-12" />
              <div className="px-3 font-display text-xs uppercase leading-none tracking-widest text-caramel-500">
                {category}
              </div>
              <div className="w-6 border-t border-caramel-300 md:w-12" />
            </div>
          )}
          {description && (
            <div className="max-w-xl text-center font-serif italic text-caramel-800 md:text-lg md:leading-relaxed">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner
