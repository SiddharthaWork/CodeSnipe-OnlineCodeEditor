import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Editor } from '@monaco-editor/react'

const EditorPage = () => {
  return (
    <div className='w-full h-screen bg-black'>
      <div className='w-full h-1/2 px-4 '>
        <div className='w-full h-full grid grid-cols-3 gap-4' >
          {/* HTML */}
          <div className='bg-black p-2 flex-col overflow-hidden'>
            <div className='bg-[#1d1e22] p-2 w-fit h-fit border-t-2 border-white/50 flex gap-1 items-center'>
              <Icon icon="vscode-icons:file-type-html" width="24" height="24" />
              <h1 className='font-kanit text-2xl'>
                Html
              </h1>
            </div>
            <div className='bg-[#1d1e22] p-2 w-full h-full border-r-2'>
              <Editor
                height="100%"
                defaultLanguage="html"
                defaultValue="<div>hello world</div>"
                theme="vs-dark"
                options={{
                  minimap: {
                    enabled: false,
                  },
                  lineNumbersMinChars: 3,
                  fontSize: 16,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* CSS */}

          <div className='bg-black p-2 flex-col  overflow-hidden'>
            <div className='bg-[#1d1e22] p-2 w-fit h-fit border-t-2 border-white/50 flex gap-1 items-center'>
              <Icon icon="devicon:css3" width="24" height="24" />
              <h1 className='font-kanit text-2xl'>
                CSS
              </h1>
            </div>
            <div className='bg-[#1d1e22] p-2 w-full h-full border-r-2'>
            <Editor
                height="100%"
                defaultLanguage="css"
                defaultValue="<div>hello world</div>"
                theme="vs-dark"
                options={{
                  minimap: {
                    enabled: false,
                  },
                  lineNumbersMinChars: 3,
                  fontSize: 16,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* JS */}

          <div className='bg-black p-2 flex-col  overflow-hidden'>
            <div className='bg-[#1d1e22] p-2 w-fit h-fit border-t-2 border-white/50 flex gap-1 items-center'>
              <Icon icon="vscode-icons:file-type-js" width="24" height="24" />
              <h1 className='font-kanit text-2xl'>
                Javascript
              </h1>
            </div>
            <div className='bg-[#1d1e22] p-2 w-full h-full border-r-2'>
            <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue="<div>hello world</div>"
                theme="vs-dark"
                options={{
                  minimap: {
                    enabled: false,
                  },
                  lineNumbersMinChars: 3,
                  fontSize: 16,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>



        </div>

      </div>

      <iframe className='w-full h-1/2 bg-white'>
       
       {/* here are some changes that need to be made */}

      </iframe>


    </div>
  )
}

export default EditorPage