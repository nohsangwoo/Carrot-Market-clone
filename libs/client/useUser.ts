import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { User } from '@prisma/client'
import { NextPageContext } from 'next'
import { withSsrSession } from '@libs/server/withSession'
import { getURL } from 'next/dist/shared/lib/utils'

interface ProfileResponse {
  ok: boolean
  profile: User
}

export default function useUser() {
  console.log('process.env.NODE_ENV: ')

  const { data, error } = useSWR<ProfileResponse>(
    `http://localhost:3000/api/users/me`,
  )
  const router = useRouter()
  console.log(process.env.NODE_ENV === 'development')
  console.log(process.env.NEXT_PUBLIC_APSOLUTE_URL_DEV)
  console.log(process.env.NEXT_PUBLIC_APSOLUTE_URL_PROD)

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter')
    }
  }, [data, router])
  return { user: data?.profile, isLoading: !data && !error }
}
