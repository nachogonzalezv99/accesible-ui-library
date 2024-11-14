'use client'
import { useRouting } from '@/app/_utils/routes'
import { projects, subprojects } from '@/app/projects/_utils/data'
import { notFound, useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

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

  return <p>Last</p>
}
