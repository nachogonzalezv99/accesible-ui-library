import React, { MouseEventHandler, useRef } from 'react'

const MAX_DOUBLE_CLICK_TIME = 500

type DoubleClickEventDetail = {
  timeBetweenClicks: number
}

export function DoubleClickButton() {
  const lastClickRef = useRef(0)

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    const timeBetweenClicks = event.timeStamp - lastClickRef.current

    if (timeBetweenClicks > MAX_DOUBLE_CLICK_TIME) return (lastClickRef.current = event.timeStamp)

    const doubleClickEvent = new CustomEvent<DoubleClickEventDetail>('custom:doubleClick', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { timeBetweenClicks }
    })

    event.target.dispatchEvent(doubleClickEvent)
    lastClickRef.current = 0
  }

  React.useEffect(() => {
    const handleDoubleClickEvent = (e: Event) => {
      const event = e as CustomEvent<DoubleClickEventDetail>
      console.log('Double click ', event.detail.timeBetweenClicks)
    }

    addEventListener('custom:doubleClick', handleDoubleClickEvent)

    return () => {
      removeEventListener('custom:doubleClick', handleDoubleClickEvent)
    }
  }, [])

  return (
    <button type="button" onClick={handleClick}>
      Click Me
    </button>
  )
}
