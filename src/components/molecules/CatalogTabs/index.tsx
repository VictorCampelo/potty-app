import React from 'react'
import { Container } from './styles'

interface CatalogProps extends React.AllHTMLAttributes<HTMLAllCollection> {
  tab1: string
  tab2: string
  tab3?: string
  content1: React.ReactElement
  content2: React.ReactElement
  content3?: React.ReactElement
  toggleState: number
  setToggleState: React.Dispatch<React.SetStateAction<number>>
}

const CatalogTabs = ({
  tab1,
  tab2,
  tab3,
  content1,
  content2,
  content3,
  toggleState,
  setToggleState
}: CatalogProps) => {
  const toggleTab = (index) => {
    setToggleState(index)
  }

  return (
    <Container>
      <div className='bloc-tabs'>
        <button
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          {tab1}
        </button>
        <button
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          {tab2}
        </button>
        {tab3 && (
          <button
            className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
            onClick={() => toggleTab(3)}
          >
            {tab3}
          </button>
        )}
      </div>

      <div className='content-tabs'>
        <div
          className={toggleState === 1 ? 'content  active-content' : 'content'}
        >
          {content1}
        </div>

        <div
          className={toggleState === 2 ? 'content  active-content' : 'content'}
        >
          {content2}
        </div>

        {content3 && (
          <div
            className={
              toggleState === 3 ? 'content  active-content' : 'content'
            }
          >
            {content3}
          </div>
        )}
      </div>
    </Container>
  )
}

export default CatalogTabs
