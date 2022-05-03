import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Bell, Search } from 'tabler-icons-react'
import { useClickOutside, useHotkeys, useWindowScroll } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { find } from 'lodash'

const Header = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const [scroll] = useWindowScroll()
  const clickOutsideRef = useClickOutside(() => setIsSearchOpen(false))
  const router = useRouter()

  const links = [
    { link: '/browse', label: 'Home' },
    { link: '/browse/tv-shows', label: 'TV Shows' },
    { link: '/browse/movies', label: 'Movies' },
    { link: '/browse/latest', label: 'New & Popular' },
    { link: '/browse/my-list', label: 'My List' }
  ]

  useHotkeys([
    ['Escape', () => setIsSearchOpen(false)],
    ['mod+k', () => onSearchClick()]
  ])

  useEffect(() => {
    setActiveItem(find(links, { link: router.pathname })?.label || null)

    if (scroll.y > 0) {
      setIsScrolling(true)
    } else {
      setIsScrolling(false)
    }
  }, [router, scroll])

  const onSearchClick = () => {
    if (clickOutsideRef?.current) {
      clickOutsideRef.current.focus()
    }

    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <header className={`${isScrolling && 'bg-[#141414]'}`}>
      <div className="header-left-container">
        <Link href={'/'} passHref>
          <svg className="cursor-pointer object-contain mr-[5px]" width="93"
               height="29"
               viewBox="0 0 1024 276.742">
            <path
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
              fill="#d81f26" />
          </svg>
        </Link>

        <ul className="hidden space-x-[20px] md:flex">
          {links.map(({ link, label }) => (
            <Link href={link} passHref key={label}>
              <li onClick={() => setActiveItem(label)}
                  className={`header-link ${activeItem === label && 'cursor-default font-semibold text-white hover:text-white'}`}>
                {label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="header-right-container">
        <div className="relative cursor-pointer inline-block">
          <Search onClick={onSearchClick} className="search-icon" />
          <input
            ref={clickOutsideRef}
            placeholder="Titles, people, genres"
            className={`search-input ${isSearchOpen ? 'w-[220px] border-white' : 'w-0 border-transparent !bg-transparent'}`} />
        </div>
        <Bell className="fill-white h-6 w-6 cursor-pointer hidden sm:block" />
        <Link href="/">
          <img
            src="https://occ-0-1892-58.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZesaaQShXZcf06B-wXWkM1w8oFKDCReJQ1Nh_JTD3eBHXOgkkEXuaG72rbTy-aKSIlTnz8eT9TYqFv-vsNp9Ew.png?r=125"
            alt="user-icon"
            className="cursor-pointer rounded hidden sm:block"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
