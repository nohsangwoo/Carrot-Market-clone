import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { User } from '@prisma/client'

interface ProfileResponse {
  ok: boolean
  profile: User
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>(`/api/users/me`)

  console.log("get user's profile: ", data)

  console.log(
    'process.env.NODE_ENV: ',
    `${
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_APSOLUTE_URL_DEV
        : process.env.NEXT_PUBLIC_APSOLUTE_URL_PROD
    }/api/users/me`,
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
