import { Link } from 'react-router-dom'
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

export function Navbar() {

    const [displayMobile, setDisplayMobile] = useState(false)

    const path = window.location.pathname

    const logo = `
        mr-8
        font-lobster 
        text-dark-900 
        text-3xl
        cursor-pointer
    `
    const auth = `
        text-lg hover:font-bold hover:tracking-tight
        cursor-pointer
    `
    const authMatch = `
        text-lg font-bold tracking-tight
        cursor-pointer
    `

    return (
      <>
        <div className='hidden md:flex justify-between items-center w-full drop-shadow-md'>
            <Link to={'/'} className={logo}>quibbble</Link>
            <Nav />
            <div className='text-dark-900 ml-8'>
                <Link className={path == '/login' ? authMatch : auth} to={'/login'}>login</Link>
                &nbsp;/&nbsp;
                <Link className={path == '/signup' ? authMatch : auth} to={'/signup'}>signup</Link>
            </div>
        </div>
        <div className='flex md:hidden justify-between w-full'>
            {
                displayMobile ? 
                    <div className='absolute flex flex-col items-center justify-center w-full h-full z-50 top-0 left-0 bg-dark-900'>
                        <div className='absolute mx-8 my-8 cursor-pointer top-0 right-0 text-dark-900 bg-yellow rounded-full p-2 text-xl' onClick={() => setDisplayMobile(false)}>
                            <IoClose />
                        </div>
                        <div className='flex flex-col items-center'>
                            <Link className={`${path == '/' ? 'text-yellow' : 'text-gray'} mb-4 font-bold`} to={'/'} onClick={() => setDisplayMobile(false)}>home</Link>
                            <Link className={`${path == '/games' ? 'text-yellow' : 'text-gray'} mb-4 font-bold`} to={'/games'} onClick={() => setDisplayMobile(false)}>games</Link>
                            <Link className={`${path == '/community' ? 'text-yellow' : 'text-gray'} mb-4 font-bold`} to={'/community'} onClick={() => setDisplayMobile(false)}>community</Link>
                            <Link className={`${path == '/blog' ? 'text-yellow' : 'text-gray'} mb-4 font-bold`} to={'/blog'} onClick={() => setDisplayMobile(false)}>blog</Link>
                            <Link className={`${path == '/login' ? 'text-yellow' : 'text-gray'} mb-4 font-bold`} to={'/login'} onClick={() => setDisplayMobile(false)}>login</Link>
                            <Link className={`${path == '/signup' ? 'text-yellow' : 'text-gray'} mb-4 font-bold`} to={'/signup'} onClick={() => setDisplayMobile(false)}>signup</Link>
                        </div>
                    </div> : <></>
            }
            <Link to={'/'} className={logo}>quibbble</Link>
            <NavMobile open={() => setDisplayMobile(true)} />
        </div>
      </>
    )
}
  
function Nav() {

    const path = window.location.pathname

    const btn = `
        group
        px-4 py-2 mr-2 
        bg-dark-700 hover:bg-yellow
        rounded-full
        text-gray hover:text-dark-900
        hover:font-bold hover:tracking-tight 
        transition ease-in-out duration-500 
        cursor-pointer
        
    `
    const btnMatch = `
        group
        px-4 py-2 mr-2 
        bg-yellow
        rounded-full 
        text-dark-900
        font-bold tracking-tight 
        transition ease-in-out duration-500 
        cursor-pointer
    `

    return (
      <div className='hidden md:flex items-center justify-left p-2 bg-dark-900 rounded-full md:w-[36rem]'>
        <Link className={path == '/' ? btnMatch : btn} to={'/'}>
            <svg className={path == '/' ? 'fill-dark-900' : 'fill-gray group-hover:fill-dark-900'} width="22" height="24" viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.69274 22.5385V18.8583C7.69272 17.9257 8.42446 17.168 9.33082 17.1622H12.6588C13.5692 17.1622 14.3073 17.9215 14.3073 18.8583V22.5278C14.3072 23.3367 14.9415 23.9941 15.7276 24H17.9981C19.0585 24.0028 20.0764 23.5713 20.8272 22.8008C21.578 22.0303 22 20.9841 22 19.893V9.439C22 8.55765 21.6203 7.72164 20.9632 7.15619L13.2498 0.809121C11.9014 -0.301053 9.97569 -0.26519 8.66729 0.89446L1.1197 7.15619C0.431594 7.70497 0.0203237 8.54346 0 9.439V19.8823C0 22.1564 1.7917 24 4.00188 24H6.22055C6.59904 24.0028 6.96298 23.8501 7.2316 23.5757C7.50022 23.3013 7.65128 22.9279 7.65127 22.5385H7.69274Z"/>
            </svg>
        </Link>
        <Link className={path.includes('/games') ? btnMatch : btn} to={'/games'}>games</Link>
        <Link className={path == '/community' ? btnMatch : btn} to={'/community'}>community</Link>
        <Link className={path == '/blog' ? btnMatch : btn} to={'/blog'}>blog</Link>
      </div>
    )
}
  

function NavMobile({ open }) {
    return (
        <div className='bg-dark-900 rounded-full p-2 flex items-center justify-center cursor-pointer drop-shadow-md' onClick={() => open()}>
            <TiThMenu className='fill-yellow text-xl' />
        </div>
    )
}
