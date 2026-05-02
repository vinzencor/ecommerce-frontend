import { useParams } from 'react-router-dom'
import { useCMSPage } from '../hooks/useCMS'
import { Loader2 } from 'lucide-react'

export default function CMSPage() {
  const { slug } = useParams()
  const { data: page, isLoading, error } = useCMSPage(slug || '')

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-neutral-400" size={32} />
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-black tracking-tighter">404</h1>
        <p className="text-neutral-500 font-medium">Page not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 leading-[1.1]">
            {page.title}
          </h1>
          <div className="h-1 w-20 bg-black rounded-full" />
        </div>
        
        <div className="prose prose-neutral max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-p:text-neutral-600 prose-p:text-lg">
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      </div>
    </div>
  )
}
