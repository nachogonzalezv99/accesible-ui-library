'use client'
import { notFound, useParams, useRouter } from 'next/navigation'
import { projects, subprojects } from '../../_utils/data'
import { Card } from '@/app/_components2/Card'
import { routesObj, useRouting } from '@/app/_utils/routes'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const { projectId } = useParams<{ projectId: string }>()
  const { updateTitle } = useRouting()

  useEffect(() => {
    const project = projects.find(p => p.id === projectId)?.name
    if (project) updateTitle([project])
    else notFound()
  }, [projectId])

  return (
    <div className="flex flex-col gap-5">
      <p>Subprojects</p>

      <div className="flex  gap-4">
        {subprojects
          .filter(s => s.projectId === projectId)
          .map(subproject => (
            <button
              key={subproject.id}
              className="flex-1"
              onClick={() => router.push(routesObj.home.projects.byId(projectId).subprojects.byId(subproject.id).path)}
            >
              <Card>
                <Card.Header>{subproject.name}</Card.Header>
                <Card.Body>{subproject.name}</Card.Body>
              </Card>
            </button>
          ))}
      </div>
    </div>
  )
}
