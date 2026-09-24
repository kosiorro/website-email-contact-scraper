import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiTitle,
  useGeneratedHtmlId,
} from '@elastic/eui';
import { useState } from 'react';

import { Link } from '../Link';

function Logo() {
  return <div className="brand-mark" aria-hidden="true">@</div>
}

function HeaderLogo({ header_title, white = false }) {
  return (
    <Link href="/" passHref>
      <a className="brand-link">
        <Logo />
        <EuiTitle size="xxs" className="title-lh">
          <span style={white ? { color: '#ffffff' } : undefined}>
            {header_title || 'KontaktFinder'}
          </span>
        </EuiTitle>
      </a>
    </Link>
  )
}

const Header = ({ header_title }) => {
  const guideHeaderCollapsibleNavId = useGeneratedHtmlId({
    prefix: 'guideHeaderCollapsibleNav',
  })

  const [navIsOpen, setNavIsOpen] = useState(false)

  const collapsibleNav = (
    <EuiCollapsibleNav
      key="collapsible-nav"
      id={guideHeaderCollapsibleNavId}
      aria-label="Główna nawigacja"
      isOpen={navIsOpen}
      isDocked={false}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Otwórz menu"
          onClick={() => setNavIsOpen(!navIsOpen)}>
          <EuiIcon type="menu" size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}>
      <EuiFlexItem className="eui-yScroll">
        <EuiCollapsibleNavGroup className="h-full child-h-full" background="none">
          <EuiListGroup maxWidth="none" color="subdued" gutterSize="none" size="s">
            <Link href="/" passHref>
              <EuiListGroupItem label="Skanowanie" />
            </Link>
            <Link href="/tasks" passHref>
              <EuiListGroupItem label="Zadania" />
            </Link>
            <Link href="/api-integration" passHref>
              <EuiListGroupItem label="API" />
            </Link>
            <Link href="/about" passHref>
              <EuiListGroupItem label="Informacje" />
            </Link>
          </EuiListGroup>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  )

  const header_items: any = [
    {
      items: [
        collapsibleNav,
        <div className="w-3" key="spacer" />,
        <HeaderLogo key="logo" header_title={header_title} white />,
      ],
      borders: 'none',
    },
    {
      items: [
        <EuiHeaderLink key="scan" href="/">Skanowanie</EuiHeaderLink>,
        <EuiHeaderLink key="tasks" href="/tasks">Zadania</EuiHeaderLink>,
        <EuiHeaderLink key="api" href="/api-integration">API</EuiHeaderLink>,
      ],
      borders: 'none',
    },
  ]

  return (
    <EuiHeader
      role="navigation"
      position="fixed"
      theme="dark"
      sections={header_items}
    />
  )
}

export default Header
