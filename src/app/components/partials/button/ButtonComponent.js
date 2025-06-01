'use client'

import themeStyling from '@/app/components/partials/config/Configuration_css.json'
import buttonConfig from './ButtonConfigStyle'

const ButtonComponent = ({onClickProps, disabledProps}) => {
  const pathName =
    typeof window !== 'undefined' ? window.location.pathname : '/'
  const lastSegment = pathName.split('/')
  const nameStyleFor = lastSegment[2]
  const styleConfig = buttonConfig[nameStyleFor] || buttonConfig.bdki

  if (themeStyling[lastSegment[2]] !== undefined) {
    return (
      <>
        <button
          // disabled={handleButtonConfirmationToDisable}
          type="submit"
          data-ripple-light="true"
          className={` ${styleConfig.bgColor} ${styleConfig.color} ${styleConfig.hover} ${styleConfig.focusRing} ${styleConfig.shadow} ${styleConfig.font} ${styleConfig.rounded} ${styleConfig.textSize} ${styleConfig.padding} ${styleConfig.textAlign} ${styleConfig.margin} ${styleConfig.display} `}
          onClick={onClickProps}
          disabled={disabledProps}
        >
          Konfirmasi
        </button>
      </>
    )
  } else {
    return (
      <>
        <button
          // disabled={handleButtonConfirmationToDisable}
          type="submit"
          data-ripple-light="true"
          className={` ${buttonConfig.bdki.bgColor} ${buttonConfig.bdki.color} ${buttonConfig.bdki.hover} ${buttonConfig.bdki.focusRing} ${buttonConfig.bdki.shadow} ${buttonConfig.bdki.font} ${buttonConfig.bdki.rounded} ${buttonConfig.bdki.textSize} ${buttonConfig.bdki.padding} ${buttonConfig.bdki.textAlign} ${buttonConfig.bdki.margin} ${buttonConfig.bdki.display} `}
          onClick={onClickProps}
          disabled={disabledProps}
        >
          Konfirmasi
        </button>
      </>
    )
  }
}

export default ButtonComponent
