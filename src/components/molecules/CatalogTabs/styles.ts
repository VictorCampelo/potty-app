import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: white;
  border-radius: 0 0 30px 30px;
  overflow: none;

  .bloc-tabs {
    display: flex;
    width: 500px;

    ${[sizes.down('sm')]} {
      display: none;
    }

    margin-left: 30px;
  }

  .tabs {
    padding: 15px;

    text-align: center;
    width: 50%;

    background: white;
    cursor: pointer;

    box-sizing: content-box;
    position: relative;
    outline: none;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 45px;

    color: var(--gray-300);

    transition: all 0.2s ease-in-out;
  }

  .active-tabs {
    background: white;
    color: var(--gray-700);
  }

  .active-tabs::before {
    content: '';

    display: block;
    position: absolute;

    bottom: 10px;
    left: 50%;

    transform: translateX(-50%);
    width: 85%;
    height: 5px;

    background: var(--color-secondary);
    border-radius: 2px;
  }

  button {
    border: none;
  }

  .content-tabs {
    flex-grow: 1;
  }

  .content {
    width: 100%;
    height: 100%;
    display: none;
  }

  .active-content {
    display: block;
  }
`
