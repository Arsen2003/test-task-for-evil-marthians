import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const HandleLogin = async (event) => {
    event.preventDefault()

    const originalFetch = window.fetch

    window.fetch = async function (url, options) {
      if (url === '/login' && options.method === 'POST') {
        const requestBody = JSON.parse(options.body)

        if (
          requestBody.email === 'okarin@mail.com' &&
          requestBody.password === '123456'
        ) {
          return {
            ok: true,
            json: async () => ({ message: 'You are successfully logged in!' }),
          }
        } else {
          return {
            ok: false,
            json: async () => ({ message: 'Invalid email or password!' }),
          }
        }
      }

      return originalFetch(url, options)
    }

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        alert('Вы успешно авторизовались!')
      } else {
        const data = await response.json()
        alert(data.message)
      }
    } catch (error) {
      alert(error.message)
    }

    window.fetch = originalFetch
  }

  return (
    <div className="App">
      <div className="authorization">
        <form className="authorization-form" onSubmit={HandleLogin}>
          <h1 className="authorization-title">Good Martians</h1>
          <label className="authorization-form-label" htmlFor="">
            <input
              placeholder="email"
              className="authorization-form-label-inp"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="authorization-form-label" htmlFor="">
            <input
              placeholder="password"
              className="authorization-form-label-inp"
              type="password"
              autoComplete="curret-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="authorization-form-button">LOGIN</button>
          <a href="" className="register__link">
            don't have an account?
          </a>
        </form>
      </div>
    </div>
  )
}

export default App
