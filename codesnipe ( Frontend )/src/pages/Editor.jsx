import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Editor } from '@monaco-editor/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/Resizable'

const EditorPage = () => {
  const [htmlCode, setHtmlCode] = useState('<div>hello world</div>');
  const [cssCode, setCssCode] = useState('* {\n  background-color: white;\n  color: black;\n}');
  const [jsCode, setJsCode] = useState('console.log(\'Hello World\');');
  const timeoutRef = useRef(null);
  const iframeRef = useRef(null);

  const execute = () => {
    if (iframeRef.current) {
      const html = htmlCode;
      const css = `<style>${cssCode}</style>`;
      const js = `<script>${jsCode}</script>`;
      iframeRef.current.srcdoc = html + css + js;
    }
  }
  // Some ui 
  const debouncedExecute = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      execute();
    }, 100);
  }

  const handleCodeChange = (setter) => (value) => {
    setter(value);
    debouncedExecute();
  }

  useEffect(() => {
    iframeRef.current = document.getElementById("iframe");
    execute();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className='w-full h-[90vh] bg-white/5 flex flex-col overflow-hidden'>
      <ResizablePanelGroup direction="vertical" className="flex-1">
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="horizontal" className="h-full px-2">
            {/* HTML Editor */}
            <ResizablePanel defaultSize={33}>
              <div className='h-full bg-white/5 p-2 flex-col overflow-hidden'>
                <div className='bg-[#1d1e22] p-2 w-fit h-fit border-t-2 border-white/50 flex gap-1 items-center'>
                  <Icon icon="vscode-icons:file-type-html" width="24" height="24" />
                  <h1 className='font-kanit text-2xl'>Html</h1>
                </div>
                <div className='bg-[#1d1e22] p-2 w-full h-full border-white/15 border-r-2 '>
                  <Editor
                    height="100%"
                    defaultLanguage="html"
                    defaultValue={htmlCode}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      lineNumbersMinChars: 3,
                      fontSize: 16,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                    onChange={handleCodeChange(setHtmlCode)}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* CSS Editor */}
            <ResizablePanel defaultSize={33}>
              <div className='h-full bg-white/5 p-2 flex-col overflow-hidden'>
                <div className='bg-[#1d1e22] p-2 w-fit h-fit border-t-2 border-white/50 flex gap-1 items-center'>
                  <Icon icon="devicon:css3" width="24" height="24" />
                  <h1 className='font-kanit text-2xl'>CSS</h1>
                </div>
                <div className='bg-[#1d1e22] p-2 w-full h-full border-white/15 border-r-2'>
                  <Editor
                    height="100%"
                    defaultLanguage="css"
                    defaultValue={cssCode}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      lineNumbersMinChars: 3,
                      fontSize: 16,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                    onChange={handleCodeChange(setCssCode)}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* JS Editor */}
            <ResizablePanel defaultSize={33}>
              <div className='h-full bg-white/5 p-2 flex-col overflow-hidden'>
                <div className='bg-[#1d1e22] relative p-2 w-fit h-fit border-t-2 border-white/50 flex gap-1 items-center'>
                  <Icon icon="vscode-icons:file-type-js" width="24" height="24" />
                  <h1 className='font-kanit text-2xl'>Javascript</h1>
                  {/* <div className='absolute top-2 -right-[24rem] rounded-full w-fit h-fit cursor-pointer'>
                    <Icon icon="ic:sharp-flip" width="24" height="24" />
                  </div> */}
                </div>
                <div className='bg-[#1d1e22] p-2 w-full h-full border-white/15 border-r-2'>
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue={jsCode}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      lineNumbersMinChars: 3,
                      fontSize: 16,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                    onChange={handleCodeChange(setJsCode)}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle />

        {/* Preview Section */}
        <ResizablePanel defaultSize={50}>
          <iframe
            id='iframe'
            className='w-full h-full bg-white'
            title="Preview"
            sandbox="allow-scripts"
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default EditorPage