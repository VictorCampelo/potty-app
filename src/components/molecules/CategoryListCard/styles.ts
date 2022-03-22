import styled from 'styled-components'

interface ContainerProp {
  isRed: boolean
  isGreen: boolean
  isOpen: boolean
}

export const Container = styled.div<ContainerProp>`
  width: 100%;
  display: flex;
  margin-bottom: var(--spacing-xxxs);
  border-radius: var(--border-radius-sm);

  .section {
    display: flex;
    flex-direction: column;
    width: 100%;

    .card-container {
      display: flex;
      align-items: center;

      width: 100%;
      height: 69px;
      /* height: 100%; */

      background: #f4f5f6;
      border-radius: var(--border-radius-sm);

      user-select: none;
      cursor: pointer;

      z-index: 1;
      .icon-btn {
        ${(props) => props.isOpen && 'transform: rotate(180deg);'}
        transition: 0.4s;
        margin: var(--spacing-xxs) var(--spacing-xxs);
      }

      .title {
        display: flex;
        align-items: center;

        font-family: var(--font-family-primary);
        font-style: var(--font-style-normal);
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-xxs);
        line-height: 22px;

        color: var(--black-1000);
      }
    }

    .children-container {
      display: none;
      align-items: center;

      /* width: 767px; */
      width: 100%;
      margin-left: var(--spacing-sm);

      overflow-y: scroll;
      max-height: 300px !important;
      ${(props) => props.isOpen && 'display: block;'}
      margin-top: var(--spacing-xxxs);

      .items {
        display: flex;
        align-items: center;

        width: 767px;

        background: #f4f4f4;
        border-radius: var(--border-radius-gg);

        font-family: var(--font-family-primary);
        font-style: var(--font-style-normal);
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-xxxs);

        margin-bottom: var(--spacing-xxxs);

        color: var(--black-1000);

        .text {
          width: 170px;
        }

        .spacer {
          width: 5px;
        }
      }

      p {
        padding: var(--spacing-quarck) var(--spacing-xxxs);
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 80%;

    padding: 0 var(--spacing-xxxs);

    background: var(--white);
    border-radius: var(--border-radius-sm);

    font-family: var(--font-family-primary);
    font-style: var(--font-style-normal);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xxxs);

    line-height: 22px;

    &:first-child {
      margin-right: var(--spacing-xxxs);
    }

    :hover {
      background: #f4f5f6;
    }
  }

  .edit-btn {
    ${(props) => props.isGreen && 'color: var(--gray-700);'}
  }

  .close-btn {
    ${(props) => props.isRed && 'color: #FF4D4B;'}
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 67px;
    width: 80px;
    padding: var(--spacing-quarck);
    border-radius: var(--border-radius-sm);
    z-index: 0;
    margin-top: 2px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin-left: -14px;
    padding-left: var(--spacing-xxs);
  }
`
