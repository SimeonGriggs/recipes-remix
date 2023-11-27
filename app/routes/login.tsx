// app/routes/login.tsx
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useActionData} from '@remix-run/react'
import {useEffect, useRef, useState} from 'react'

import FormField from '~/components/FormField'
import Layout from '~/components/Layout'
import {login, register, getUser} from '~/utils/auth.server'
import {validateEmail, validateName, validatePassword} from '~/utils/validators.server'

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData()
  const action = form.get('_action')
  const email = form.get('email')
  const password = form.get('password')
  let firstName = form.get('firstName')
  let lastName = form.get('lastName')

  if (typeof action !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return json({error: `Invalid Form Data`, form: action}, {status: 400})
  }

  if (action === 'register' && (typeof firstName !== 'string' || typeof lastName !== 'string')) {
    return json({error: `Invalid Form Data`, form: action}, {status: 400})
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === 'register'
      ? {
          firstName: validateName((firstName as string) || ''),
          lastName: validateName((lastName as string) || ''),
        }
      : {}),
  }

  if (Object.values(errors).some(Boolean))
    return json(
      {errors, fields: {email, password, firstName, lastName}, form: action},
      {status: 400}
    )

  switch (action) {
    case 'login': {
      return await login({email, password})
    }
    case 'register': {
      firstName = firstName as string
      lastName = lastName as string
      return await register({email, password, firstName, lastName})
    }
    default:
      return json({error: `Invalid Form Data`}, {status: 400})
  }
}

export const loader: LoaderFunction = async ({request}) => {
  // If there's already a user in the session, redirect to the home page
  return (await getUser(request)) ? redirect('/') : null
}

export default function Login() {
  const [action, setAction] = useState('login')
  const actionData = useActionData()
  const firstLoad = useRef(true)
  const [errors, setErrors] = useState(actionData?.errors || {})
  const [formError, setFormError] = useState(actionData?.error || '')
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password || '',
    firstName: actionData?.fields?.lastName || '',
    lastName: actionData?.fields?.firstName || '',
  })

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }
      setErrors(newState)
      setFormError('')
      setFormData(newState)
    }
  }, [action])

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError('')
    }
  }, [formData])

  useEffect(() => {
    firstLoad.current = false
  }, [])

  // Updates the form data when an input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((form) => ({...form, [field]: event.target.value}))
  }

  return (
    <Layout>
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <button
          onClick={() => setAction(action == 'login' ? 'register' : 'login')}
          className="absolute top-8 right-8 rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
        >
          {action === 'login' ? 'Sign Up' : 'Sign In'}
        </button>
        <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to Kudos!</h2>
        <p className="font-semibold text-slate-300">
          {action === 'login' ? 'Log In To Give Some Praise!' : 'Sign Up To Get Started!'}
        </p>
        <form method="POST" className="w-96 rounded-2xl bg-gray-200 p-6">
          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, 'email')}
            error={errors?.email}
          />
          <FormField
            htmlFor="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, 'password')}
            error={errors?.password}
          />
          {action === 'register' && (
            <>
              <FormField
                htmlFor="firstName"
                label="First Name"
                onChange={(e) => handleInputChange(e, 'firstName')}
                value={formData.firstName}
                error={errors?.firstName}
              />
              <FormField
                htmlFor="lastName"
                label="Last Name"
                onChange={(e) => handleInputChange(e, 'lastName')}
                value={formData.lastName}
                error={errors?.lastName}
              />
            </>
          )}
          <div className="w-full text-center">
            <button
              type="submit"
              name="_action"
              value={action}
              className="mt-2 rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
            >
              {action === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
