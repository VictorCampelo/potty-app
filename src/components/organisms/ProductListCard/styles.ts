import styled from 'styled-components'
import sizes from '@/utils/sizes'

interface ContainerProp {
  isRed: boolean
  isGreen: boolean
}

export const Hr = styled.hr`
  ${[sizes.up('sm')]} {
    display: none;
  }
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.02),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.02)
  );
`

export const Container = styled.div<ContainerProp>`
  width: auto;
  max-width: 1050px;
  height: 76px;

  display: flex;
  align-items: center;

  margin-bottom: var(--spacing-xxxs);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: var(--border-radius-sm);

  ${[sizes.down('sm')]} {
    box-shadow: none;
  }

  .card-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    .color {
      display: flex;
      flex-direction: row;
      align-items: center;

      width: 1000px;
      height: 76px;

      background-color: #f4f5f6;
      ${[sizes.down('sm')]} {
        width: 100%;
        height: 96px;
        background-color: transparent;
        align-items: unset;
        gap: 8px;
      }

      border-radius: 8px;

      z-index: 1;

      .icon {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;

        border-radius: var(--border-radius-xxs);

        background-color: var(--white);

        margin-left: var(--spacing-nano);
        margin-right: var(--spacing-nano);

        ${[sizes.down('sm')]} {
          width: 94px;
          height: 94px;

          &.border {
            border: 3px solid #f4f4f4;
            border-radius: var(--border-radius-xs);
          }
        }
      }

      .desc-container-mobile {
        width: 200px;
        ${[sizes.up('sm')]} {
          display: none;
        }

        .action-button {
          background: transparent;
          padding: 4px;
          border: none;
        }
        .first-line {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 4px;
          margin-bottom: 7px;
        }
        .key-value {
          width: 94px;
          height: 44px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: #e7e8ea;

          padding: 2px 8px;

          border-radius: 10px;

          .key {
            font-family: Poppins;
            font-style: normal;
            font-weight: 600;
            font-size: 13px;
            line-height: 19px;
            color: #6c7079;
          }

          .value {
            font-family: Poppins;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 21px;
            color: #363f4e;
          }
        }
      }

      .desc-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        ${[sizes.down('sm')]} {
          display: none;
        }

        width: 100%;
        height: 76px;
        border-radius: 0;

        padding-right: var(--spacing-md);

        tr {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

        .title {
          display: flex;
          align-items: center;
          text-align: center;

          width: 100px;
          height: 16px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-left: var(--spacing-md);
          margin-bottom: var(--spacing-quarck);

          background: #e7e8ea;
          border-radius: var(--border-radius-xxs);

          font-family: var(--font-family-primary);
          font-style: var(--font-style-normal);
          font-weight: var(--font-weight-light);
          font-size: var(--font-size-xxxxs);
          line-height: 19px;

          color: #6c7079;
        }

        .children {
          display: flex;
          align-items: center;
          text-align: center;

          width: 105px;
          height: 24px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-left: var(--spacing-md);

          font-family: var(--font-family-primary);
          font-style: var(--font-style-normal);
          font-weight: var(--font-weight-light);
          font-size: var(--font-size-xxs);

          line-height: 24px;
          color: #363f4e;
        }
      }
    }
  }
`
export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;

  ${[sizes.down('sm')]} {
    display: none;
  }

  justify-content: space-around;
  align-items: center;

  width: 200px;
  height: 100%;
  border-radius: var(--border-radius-sm);
  margin-left: calc(var(--spacing-xxs) * -1);
  z-index: 1;
  background-color: var(--white);
  padding-left: var(--spacing-xxxs);

  button {
    background: var(--white);
    color: var(--red);
  }

  .edit-btn {
    color: #000;
  }
`
