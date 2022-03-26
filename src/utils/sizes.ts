interface Breakpoints {
  xs: '475px',
  sm: '640px'
  md: '768px'
  lg: '1024px'
  xl: '1280px'
  '2xl': '1536px'
}

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

const sizes = {
  up(size: Breakpoint) {
    return `@media only screen and (min-width: ${breakpoints[size]})`
  },
  down(size: Breakpoint) {
    return `@media only screen and (max-width: ${breakpoints[size]})`
  }
}

export default sizes
