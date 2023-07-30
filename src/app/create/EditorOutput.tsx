'use client'

import CustomCodeRenderer from '@/components/renderers/CustomCodeRenderer'
import CustomImageRenderer from '@/components/renderers/CustomImageRenderer'
import { FC } from 'react'
import dynamic from 'next/dynamic'
import CustomQuoteRenderer from '@/components/renderers/CustomQuoteRenderer'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

interface EditorOutputProps {
  content: any
}

const renderers = {
  code: CustomCodeRenderer,
  quote: CustomQuoteRenderer
}



const EditorOutput: FC<EditorOutputProps> = ({ title, content }) => {
  return (
    <>
    <Output
      renderers={renderers}
      data={content}
      />
      </>
  )
}

export default EditorOutput
