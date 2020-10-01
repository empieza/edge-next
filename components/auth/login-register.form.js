import Link from 'next/link'
import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import config from '@lib/config'

import Button from '../generic/button/button'
import PasswordStrength from '../generic/password-strength/password-strength'

const Form = ({ isLogin, errorMessage, onSubmit, loading }) => {
  const [state, setState] = useState({ email: '', password: '' })
  const password = state.password

  const { executeRecaptcha } = useGoogleReCaptcha()

  const onChange = (event) => {
    event.persist()

    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = await executeRecaptcha('login_page')

    if (token) {
      onSubmit(state)
    }
  }

  const hasSocialProviders =
    config.user.providers.facebook ||
    config.user.providers.google ||
    config.user.providers.github

  return (
    <>
      <div className="social">
        <div className="social-buttons">
          {config.user.providers.google && (
            <div className="social-button">
              <Link href="/api/auth/google">
                <a title="Sign up with Google">
                  <Button fullWidth hoverable>
                    <span className="social-link">
                      <img src="/icons/google.svg" alt="Google icon" /> Continue
                      with Google
                    </span>
                  </Button>
                </a>
              </Link>
            </div>
          )}
          {config.user.providers.facebook && (
            <div className="social-button">
              <Link href="/api/auth/facebook">
                <a title="Sign up with Facebook">
                  <Button fullWidth hoverable>
                    <span className="social-link">
                      <img src="/icons/facebook.svg" alt="facebook icon" />{' '}
                      Continue with Facebook
                    </span>
                  </Button>
                </a>
              </Link>
            </div>
          )}
          {config.user.providers.github && (
            <div className="social-button">
              <Link href="/api/auth/github">
                <a title="Sign up with GitHub">
                  <Button fullWidth hoverable>
                    <span className="social-link">
                      <img src="/icons/github.svg" alt="github icon" /> Continue
                      with GitHub
                    </span>
                  </Button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {hasSocialProviders && <hr className="sign-up-form-separator"></hr>}
        {!isLogin && (
          <div className="input-group required">
            <input
              type="text"
              placeholder="Nombre de usuario"
              name="username"
              pattern="[a-z\d_-]+$"
              required
              onChange={onChange}
            />
            <div className="description">
              Usa solamente letras en minúsculas, numeros y guiones bajos.
            </div>
          </div>
        )}
        <div className="input-group required">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            onChange={onChange}
          />
        </div>
        <div className="input-group password required">
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={password}
            placeholder="Contraseña"
            required
          />
          <div className="toggle-password">
            <svg
              className="show-password"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 12"
            >
              <path
                fill="#000"
                fillRule="nonzero"
                d="M9 .375C5.25.375 2.0475 2.7075.75 6c1.2975 3.2925 4.5 5.625 8.25 5.625S15.9525 9.2925 17.25 6C15.9525 2.7075 12.75.375 9 .375zM9 9.75C6.93 9.75 5.25 8.07 5.25 6c0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75zm0-6C7.755 3.75 6.75 4.755 6.75 6S7.755 8.25 9 8.25 11.25 7.245 11.25 6 10.245 3.75 9 3.75z"
              />
            </svg>
            <svg
              className="hide-password"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 15"
            >
              <path
                fill="#000"
                fillRule="nonzero"
                d="M9.0038 3.2514c2.0709 0 3.7517 1.6807 3.7517 3.7517 0 .4877-.0976.9454-.2702 1.373l2.191 2.191c1.133-.9453 2.026-2.1684 2.5737-3.564-1.298-3.294-4.502-5.6276-8.2538-5.6276a8.7379 8.7379 0 00-2.9863.5253l1.6207 1.6207c.4277-.1726.8854-.2701 1.3732-.2701zM1.5003 1.2029l1.7108 1.7108.3452.3452C2.3107 4.2269 1.3353 5.5174.75 7.003c1.298 3.294 4.502 5.6275 8.2538 5.6275 1.163 0 2.2735-.225 3.2864-.6303l.3152.3152 2.1985 2.191.953-.953L2.4532.25l-.953.953zm4.1494 4.1494l1.163 1.163c-.0375.1576-.06.3227-.06.4878 0 1.2455 1.0055 2.251 2.251 2.251.1651 0 .3302-.0225.4878-.06l1.163 1.163c-.5027.2476-1.058.3977-1.6507.3977-2.071 0-3.7518-1.6808-3.7518-3.7517 0-.5928.1501-1.148.3977-1.6508zm3.234-.5852l2.3636 2.3635.015-.12c0-1.2456-1.0055-2.251-2.251-2.251l-.1276.0075z"
              />
            </svg>
          </div>
        </div>

        {!isLogin && (
          <div className="input-group required">
            <PasswordStrength password={password} />
          </div>
        )}

        {!isLogin && (
          <div className="terms">
            Al registrarte aceptas nuestros{' '}
            <Link href="/p/terms-of-service">
              <a title="Términos del servicio">Términos del servicio</a>
            </Link>
            . Aprende más acerca de nuestra{' '}
            <Link href="/p/privacy-policy">
              <a title="política de privacidad">política de privacidad</a>
            </Link>{' '}
            y nuestra{' '}
            <Link href="/p/copyright-policy">
              <a title="política de copyright">política de copyright</a>
            </Link>
            .
          </div>
        )}

        <div className="submit">
          {isLogin ? (
            <>
              <Button
                loading={loading}
                big={true}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>

              <div className="alt-actions">
                <Link href="/auth/signup">
                  <a title="Ir al registro">No tengo una cuenta</a>
                </Link>
                <Link href="/auth/reset-password">
                  <a title="Recordar mi contraseña">
                    No recuerdo mi contraseña
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Button
                loading={loading}
                big={true}
                alt={true}
                fullWidth={true}
                type="submit"
                title="Registro"
              >
                Registro
              </Button>

              <div className="alt-actions">
                <Link href="/auth/login">
                  <a title="Ir al login">Ya tengo una cuenta</a>
                </Link>
              </div>
            </>
          )}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <style jsx>{`
        .social-button a {
          text-decoration: none;
        }

        .social-link {
          display: flex;
          justify-content: flex-start;
          padding-left: 15px;
          align-items: center;
        }

        .social-link img {
          width: 20px;
          margin-right: 10px;
        }

        .sign-up-form-separator {
          overflow: visible;
          padding: 0;
          margin: var(--edge-gap-medium) 0 var(--edge-gap-half) 0;
          border: none;
          border-top: 1px solid var(--accents-2);
          color: var(--accents-3);
          text-align: center;
        }

        .sign-up-form-separator::after {
          content: 'Or';
          display: inline-block;
          position: relative;
          top: var(--edge-gap-half-negative);
          padding: 0 var(--edge-gap);
          background: var(--edge-background);
        }

        .terms {
          margin-bottom: var(--edge-gap);
          font-size: 13px;
        }

        .terms a {
          color: var(--edge-foreground);
        }

        .social-button {
          margin-bottom: var(--edge-gap-half);
        }

        .alt-actions {
          font-size: 13px;
          margin-top: var(--edge-gap);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .alt-actions a {
          display: block;
          color: var(--edge-foreground);
          text-decoration: none;
        }

        .description  {
          color: var(--accents-3);
          font-size: 12px;
        }
      `}</style>
    </>
  )
}

export default Form
