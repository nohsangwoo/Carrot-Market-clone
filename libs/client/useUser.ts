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
    process.env.NODE_ENV === 'development'
      ? process.env.APSOLUTE_URL
      : `${'https://' + process.env.VERCEL_URL}`,
  )
  const router = useRouter()
  console.log(
    'get apsolute url: ',
    process.env.NODE_ENV === 'development'
      ? process.env.APSOLUTE_URL
      : `${'https://' + process.env.VERCEL_URL}`,
  )
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter')
    }
  }, [data, router])
  return { user: data?.profile, isLoading: !data && !error }
}
