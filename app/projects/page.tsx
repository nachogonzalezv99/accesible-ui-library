'use client'
import { useRouter } from 'next/navigation'
import { Card } from '../_components2/Card'
import { routesObj } from '../_utils/routes'
import { projects } from './_utils/data'



export default function Page() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-5">
      <p>projects</p>

      <div className="flex  gap-4">
        {projects.map(project => (
          <button
            key={project.id}
            className="flex-1"
            onClick={() => router.push(routesObj.home.projects.byId(project.id).path)}
          >
            <Card>
              <Card.Header>{project.name}</Card.Header>
              <Card.Body>{project.name}</Card.Body>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}
