import React, { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { BsChevronDoubleRight } from 'react-icons/bs'

import { Nav, ToggleButton, Icon } from './styles'

import type { IconType } from 'react-icons'

type Links = {
  name: string
  icon: IconType
  href?: string
  color?: string
  onClick?: () => void
}[]

interface Props {
  links: Links
}

const Navbar = ({ links }: Props) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <Nav open={open}>
      <ToggleButton onClick={toggleOpen}>
        <BsChevronDoubleRight color='white' />
      </ToggleButton>

      {links.map((link, i) => {
        if (link.href) {
          const color =
            router.pathname === link.href ? 'var(--color-primary)' : ''

          return (
            <Link key={i} href={link.href} passHref>
              <Icon color={color} showText={open}>
                {link.icon({ color })}
                <span>{link.name}</span>
              </Icon>
            </Link>
          )
        }

        return (
          <Icon key={i} color={link.color} onClick={link.onClick}>
            {link.icon({ color: link.color })}
            <span>{link.name}</span>
          </Icon>
        )
      })}
    </Nav>
  )
}

export default Navbar
