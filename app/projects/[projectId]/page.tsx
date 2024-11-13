'use client'
import { routesObj, useRouting } from '@/app/_utils/routes'
import { notFound, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { projects } from '../_utils/data'
import { Button } from '@/app/_components2/Button'
// import { useRouter } from 'next/router'

export default function Page() {
  // const router = useRouter()
  const { projectId } = useParams<{ projectId: string }>()
  const { updateTitle } = useRouting()

  useEffect(() => {
    const project = projects.find(p => p.id === projectId)?.name
    if (project) updateTitle(project)
    else notFound()
  }, [projectId])

  return (
    <div>
      <p>Project {projectId}</p>
      {/* <Button onClick={() => router.push(routesObj.home.projects.projectById(projectId!))}>Subfields</Button> */}
    </div>
  )
}
