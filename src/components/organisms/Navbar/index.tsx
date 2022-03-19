import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Nav, Icon } from './styles'

import type { IconType } from 'react-icons'

type Links = {
  name: string
  icon: IconType
  href?: string
  color?: string
}[]

interface Props {
  links: Links
}

const Navbar = ({ links }: Props) => {
  const router = useRouter()

  return (
    <Nav>
      {links.map((link, i) => {
        if (link.href) {
          const color = router.pathname.includes(link.href)
            ? 'var(--color-primary)'
            : ''

          return (
            <Link key={i} href={link.href} passHref>
              <Icon color={color}>
                {link.icon({ color })}
                <span>{link.name}</span>
              </Icon>
            </Link>
          )
        }

        return (
          <Icon key={i} color={link.color}>
            {link.icon({ color: link.color })}
            <span>{link.name}</span>
          </Icon>
        )
      })}
    </Nav>
  )
}

export default Navbar
