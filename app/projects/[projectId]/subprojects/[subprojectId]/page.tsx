'use client'
import { routesObj, useRouting } from '@/app/_utils/routes'
import { notFound, useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { projects, subprojects } from '../../../_utils/data'
import { Button } from '@/app/_components2/Button'

export default function Page() {
  const router = useRouter()
  const { projectId, subprojectId } = useParams<{ projectId: string; subprojectId: string }>()
  const { updateTitle } = useRouting()
  const project = projects.find(p => p.id === projectId)?.name
  const subprojectName = subprojects.find(p => p.id === subprojectId)?.name

  useEffect(() => {
    if (project && subprojectName) updateTitle([project, subprojectName])
    else notFound()
  }, [projectId])

  return (
    <div>
      <p>Subproject: {subprojectName}</p>
      <Button
        onClick={() => router.push(routesObj.home.projects.byId(projectId).subprojects.byId(subprojectId).last.path)}
      >
        Last
      </Button>
    </div>
  )
}
