import React from 'react'
import cat from '../images/котик.jpeg'
import { Link, useLocation } from 'react-router-dom'

const Test = () => {
    const location = useLocation()
    console.log(location.pathname)
  return (
    <div>
        <img src={cat} alt="" />
        <Link to='/'>
        <button>перейти обратно</button>
        <h1>Заголовок, который нужно убрать!</h1>
        <p>Все что сдесь, при клике, приведет меня на главную страницу</p>
        </Link>
        
    </div>
  )
}

export default Test
