import styled, { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  html {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  }

  :root {
    /* ========= [COLORS] ================ */
    --white: #FFFFFF;
    --background: #FEFAEF;
    --black-1000: #000000;
    --black-800: #363F4E;
    --black-500: #55637b;

    --red: #FF4D4B;

    --gray-100: #F2F4F3;
    --gray-150: #f0f0f0;
    --gray-200: #C4C4C4;
    --gray-300: #B2B5BA;
    --gray-600: #6B7079;
    --gray-700: #363F4E;
    --yellow-600: #F7EAD5;
    --yellow: #FFC658;
    --gold: #ffe249;

    --color-primary: #FF7A00;
    --color-primary-darker: #BF5C00;
    --color-secondary: #AC4EDF;
    --color-secondary-darker: #5D1A82;

    --blue-primary: #3C8EFC;
    --blue-dark: #2A78E1;

    --confirmation: #01AC8A;

    --wave-1: #F9EFDC;
    --wave-2: #F5E7CD;
    /* ================================== */

    /* ========= [TYPOGRAPHY] ========= */
    --font-family-primary: 'Poppins', sans-serif;
    --font-style-normal: normal;
    /* ================================== */

     /* ======== [FONT SIZE] ============ */
    --font-size-xxxxs: .75rem; // 12px
    --font-size-xxxs: .875rem; // 14px
    --font-size-xxs: 1rem; // 16px
    --font-size-xs: 1.125rem; // 18px
    --font-size-sm: 1.25rem; // 20px
    --font-size-md: 1.5rem; // 24px
    --font-size-lg: 1.75rem; //28px
    --font-size-xlg: 2rem; // 32px
    --font-size-xxl: 2.5rem; // 40px
    --font-size-xxxl: 3rem; // 48px
    --font-size-xxxxl: 4rem; // 64px
    --font-size-display: 5rem; // 80px
    --font-size-giant: 6rem; // 96px

    /* FONT WEIGHT */
    --font-weight-bold: 700;
    --font-weight-medium: 600;
    --font-weight-regular: 500;
    --font-weight-light: 400;

    /* LINE HEIGHT */
    --line-height-tight: 100%;
    --line-height-md: 120%;
    --line-height-distant: 150%;
    --line-height-super-distant: 200%;

    /* =============================== */

    /* ========== [BORDER] =========== */
    --border-radius-xxs: 4px;
    --border-radius-sm: 8px;
    --border-radius-md: 16px;
    --border-radius-lg: 24px;
    --border-radius-gg: 28px;
    --border-radius-pill: 500px;
    --border-radius-circular: 50%;

    /* WIDTH */
    --border-width-none: 0;
    --border-width-hairline: 1px;
    --border-width-thin: 2px;
    --border-width-thick: 4px;
    --border-width-heavy: 8px;

    /* ============================== */

    /* ========== SPACINGS ========== */

    --spacing-quarck: .25rem; // 4px
    --spacing-nano: .5rem; // 8px
    --spacing-xxxs: 1rem; // 16px
    --spacing-xxs: 1.5rem; // 24px
    --spacing-xs: 2rem; // 32px
    --spacing-sm: 2.5rem; //40px
    --spacing-md: 3rem; //48px
    --spacing-lg: 4rem; // 64px
    --spacing-xl: 5rem; // 80px
    --spacing-xxl: 5.5rem; // 88px
    --spacing-xxxl: 6rem; // 96px
    --spacing-xxxxl: 6.5rem; // 104px
    --spacing-huge: 7rem; // 112px
    --spacing-xhuge: 7.5rem; // 120px

    /* =============================== */
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
  }

  body, input, textarea, select, button {
    font: 400 1rem "Poppins", sans-serif;
    color: var(--black-800);
  }

  *::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: transparent;
  }
  *::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: var(--gray-200);
  }

  p {
    color: var(--gray-600);
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background: var(--gray-100);
  margin: 0 auto;
`

export const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`
