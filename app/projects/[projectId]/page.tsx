'use client'
import { Button } from '@/app/_components2/Button'
import { routesObj, useRouting } from '@/app/_utils/routes'
import { notFound, useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { projects } from '../_utils/data'

export default function Page() {
  const router = useRouter()
  const { projectId } = useParams<{ projectId: string }>()
  const projectName = projects.find(p => p.id === projectId)?.name
  const { updateTitle } = useRouting()

  useEffect(() => {
    if (projectName) updateTitle([projectName])
    else notFound()
  }, [projectId])

  return (
    <div>
      <p>Project: {projectName}</p>
      <Button onClick={() => router.push(routesObj.home.projects.byId(projectId!).subprojects.path)}>
        Subprojects
      </Button>
    </div>
  )
}
