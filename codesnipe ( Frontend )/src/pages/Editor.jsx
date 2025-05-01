import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Editor } from '@monaco-editor/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/Resizable'
import { API_BASE_URL } from '../../helper'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const EditorPage = () => {
  const { projectid } = useParams();
  
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const iframeRef = useRef(null);
  
  const updateCode = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}updateProject`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          projectId: projectid,
          htmlcode: htmlCode, 
          csscode: cssCode,
          jscode: jsCode
        }),
      });
    
      const data = await res.json();
      if(data.success){
        toast.success("Saved Successfully");
        console.log(data.message);
      }
      else{
        toast.error(data.message);
        console.log(data.message);
      }
    }
    catch(error){
      toast.error("Failed to save code");
      console.log(error);
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.ctrlKey && event.key === 's'){
        event.preventDefault();
        updateCode();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return() => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [htmlCode, cssCode, jsCode]); // Added dependencies to prevent stale closure

  const generateSrcDoc = () => {
    return `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>${htmlCode}</body>
        <script>${jsCode}</script>
      </html>
    `;
  };
  
  const handleCodeChange = (setter) => (value) => {
    setter(value);
  };

  // Update iframe when code changes
  useEffect(() => {
    if (dataFetched && iframeRef.current) {
      const srcDoc = generateSrcDoc();
      iframeRef.current.srcdoc = srcDoc;
    }
  }, [htmlCode, cssCode, jsCode, dataFetched]);

  // Set iframe reference
  useEffect(() => {
    iframeRef.current = document.getElementById("iframe");
  }, []);

  const getCode = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}getOneProject`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          projectId: projectid,
        }),
      });

      const data = await res.json();
      if (data.success && data.project) {
        setHtmlCode(data.project.htmlCode || '<div>hello world</div>');
        setCssCode(data.project.cssCode || '* {\n  background-color: white;\n  color: black;\n}');
        setJsCode(data.project.jsCode || 'console.log("Hello World");');
        setDataFetched(true);
      } else {
        toast.error(data.message || "Failed to load project");
        console.log("Error:", data.message);
      }
    } catch(error) {
      toast.error("Server Error Occurred");
      console.error("Error loading code:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch code on component mount
  useEffect(() => {
    getCode();
  }, [projectid]); 

  const SkeletonLoader = () => (
    <div className="animate-pulse h-full w-full bg-[#1e1e1e] rounded">
      <div className="flex items-center p-2 border-t-2 border-white/20">
        <div className="w-6 h-6 bg-gray-600 rounded mr-2"></div>
        <div className="h-8 w-20 bg-gray-600 rounded"></div>
      </div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-600 rounded w-5/6"></div>
        <div className="h-4 bg-gray-600 rounded w-2/3"></div>
      </div>
    </div>
  );

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
                <div className='bg-[#1d1e22] p-2 w-full h-full border-white/15 border-r-2'>
                  {loading ? (
                    <SkeletonLoader />
                  ) : (
                    <Editor
                      height="100%"
                      defaultLanguage="html"
                      value={htmlCode}
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
                  )}
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
                  {loading ? (
                    <SkeletonLoader />
                  ) : (
                    <Editor
                      height="100%"
                      defaultLanguage="css"
                      value={cssCode}
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
                  )}
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
                </div>
                <div className='bg-[#1d1e22] p-2 w-full h-full border-white/15 border-r-2'>
                  {loading ? (
                    <SkeletonLoader />
                  ) : (
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      value={jsCode}
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
                  )}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle />

        {/* Preview Section */}
        <ResizablePanel defaultSize={50}>
          {loading ? (
            <div className="w-full h-full bg-white flex items-center justify-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <iframe
              id='iframe'
              className='w-full h-full bg-white'
              title="Preview"
              sandbox="allow-scripts"
              srcDoc={generateSrcDoc()}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default EditorPage