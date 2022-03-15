import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Container = styled.div`
  ${[sizes.down('lg')]} {
    display: none;
  }

  .first {
    position: absolute;
    bottom: 0;
    height: 85%;
    left: 0;
    right: 0;
    width: 100%;
  }

  .second {
    position: absolute;
    bottom: 0;
    height: 65%;
    left: 0;
    right: 0;
    width: 100%;
  }

  .third {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 55%;
  }

  .fourth {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50%;
  }
`
