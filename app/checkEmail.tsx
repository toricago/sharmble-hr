"use client"
import { FunctionComponent, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useClerk } from "@clerk/clerk-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface CheckEmailProps {
  children: React.ReactNode
}

const URL = process.env.NEXT_PUBLIC_URL

async function check(email: String) {
  const res = await axios.post(`${URL}/employee`, {
    email: email,
  })

  const data = await res.data
  return data
}

const CheckEmail: FunctionComponent<CheckEmailProps> = ({ children }) => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const { toast } = useToast()
  const router = useRouter()

  const { data, isError, isLoading } = useQuery({
    queryKey: ["check-email"],
    queryFn: () => check(user?.emailAddresses[0].emailAddress || ""),
    refetchOnWindowFocus: false,
    enabled: !!user,
    refetchInterval: Infinity,
  })

  useEffect(() => {
    if (data && !data?.email) {
      toast({
        title: "Invalid User",
        description: "Please login again.",
      })

      signOut(() => router.push("/"))
    }
  }, [data])

  if (isLoading) return <p>Loading...</p>
  if (isError || (data && !data?.email)) return <p>Error!</p>
  if (data?.email) return children
}

export default CheckEmail
