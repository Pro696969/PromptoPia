'use client'
import { useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePromptContent = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const createPrompt = async (e) => {
    e.preventDefault() // in normal html while submitting it will reload which we dont want here, minimize realoads as much as possible
    setSubmitting(true) //some sort of loader
    try {
      const response = await fetch('/api/prompt/new',
        {
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag
          })
        })
        if(response.ok) {
          router.push('/')
        }
    } catch (error){
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

const CreatePrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePromptContent />
    </Suspense>
  )
}

export default CreatePrompt
