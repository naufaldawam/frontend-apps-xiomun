const ButtonConfigStyle = {
  primary: {
    bgColor: 'bg-primary-500',
    color: 'text-white',
    outline:
      'border-primary-500 text-primary-500 bg-opacity-0 hover:bg-opacity-10',
  },
  secondary: {
    bgColor: 'bg-secondary-500',
    color: 'text-white',
    outline:
      'border-secondary-500 text-secondary-500 bg-opacity-0 hover:bg-opacity-10',
  },

  // Sizes
  small: 'px-3 py-2',
  medium: 'px-4 py-2',
  large: 'px-5 py-2',

  // config style button for martipay
  martipay: {
    bgColor: 'bg-blue-500',
    color: 'text-white',
    hover: 'hover:bg-blue-900',
    focusRing:
      'focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800',
    shadow:
      'shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80',
    font: 'font-medium',
    rounded: 'rounded-lg',
    textSize: 'text-sm',
    padding: 'px-5 py-2.5',
    textAlign: 'text-center',
    margin: 'me-2 mb-2 mt-6',
    display: 'block w-full',
  },
  bdki: {
    bgColor: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600',
    color: 'text-white',
    hover: 'hover:bg-gradient-to-br',
    focusRing:
      'focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800',
    shadow: 'shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80',
    font: 'font-medium',
    rounded: 'rounded-lg',
    textSize: 'text-sm',
    padding: 'px-5 py-2.5',
    textAlign: 'text-center',
    margin: 'me-2 mb-2 mt-6',
    display: 'block w-full',
  },
  lrt: {
    bgColor: 'bg-lrt-primary',
    color: 'text-white',
    hover: 'hover:bg-lrt-primary',
    font: 'font-medium',
    rounded: 'rounded-md',
    textSize: 'text-sm',
    padding: 'px-5 py-2.5',
    textAlign: 'text-center',
    margin: 'me-2 mb-2 mt-6',
    display: 'block w-full',
  },
}

export default ButtonConfigStyle
