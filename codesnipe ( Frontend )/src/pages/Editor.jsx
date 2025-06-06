import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Editor } from '@monaco-editor/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/Resizable'
import { API_BASE_URL } from '../../helper'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import html2canvas from 'html2canvas'
import { useEditor } from '../context/EditorContext'

const EditorPage = () => {
  const { projectid } = useParams();
  const { registerEditorFunctions } = useEditor();
  
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [title,setTitle] = useState('');
  const iframeRef = useRef(null);
  

  const saveScreenshot = async () => {
    try {
      // Get the iframe element
      const iframe = document.getElementById('iframe');
      if (!iframe) {
        toast.error('Iframe not found');
        return;
      }

      // Access iframe content
      let iframeDoc;
      try {
        iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        console.log('Successfully accessed iframe document');
      } catch (accessError) {
        console.error('Cannot access iframe content:', accessError);
        toast.error('Cannot access iframe content - security restriction');
        return;
      }

      // Wait for any animations or rendering to complete
      // await new Promise(resolve => setTimeout(resolve, 300));

      // Use html2canvas with proper settings
      const screenshotCanvas = await html2canvas(iframeDoc.body, {
        allowTaint: true,
        useCORS: true,
        scale: 1,
        logging: false,
        ignoreElements: (element) => {
          // Ignore elements that might cause issues (optional)
          return false;
        }
      });

      // Convert canvas to a data URL and then to a Blob
      screenshotCanvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error('Failed to create image');
          return;
        }

        // Create form data
        const formData = new FormData();
        formData.append('name', 'Project Screenshot');
        formData.append('projectId', projectid);
        formData.append('userId', localStorage.getItem('userId'));
        // Change 'image' to 'photo' to match the backend multer configuration
        formData.append('photo', blob, 'project-screenshot.png');
        formData.append('title', title);

        try {
          console.log('Uploading screenshot to:', `${API_BASE_URL}image/upload`);
          console.log('Form data fields:', 
            Array.from(formData.entries()).map(entry => entry[0])
          );
          
          // First check if an image already exists for this project
          const checkResponse = await fetch(`${API_BASE_URL}image/check/${projectid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          const checkResult = await checkResponse.json();
          let endpoint = `${API_BASE_URL}image/upload`;
          let method = 'POST';
          
          // If image exists, use update endpoint instead
          if (checkResponse.ok && checkResult.exists && checkResult.imageId) {
            endpoint = `${API_BASE_URL}image/update/${checkResult.imageId}`;
            method = 'PUT';
            console.log('Updating existing image with ID:', checkResult.imageId);
          } else {
            console.log('Creating new image for project');
          }
          
          // Upload or update the screenshot
          const response = await fetch(endpoint, {
            method: method,
            body: formData,
          });

          // Handle response
          if (!response.ok) {
            console.error('Server error:', response.status);
            toast.error(`Server error: ${response.status}`);
            return;
          }

          const result = await response.json();
          if (result.success) {
            // toast.success('Screenshot saved');
            toast.promise(
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve('Screenshot saved');
                },1000)
              }),
              {
                loading: 'Saving output...',
                success: 'Output Saved Successfully',
                error: 'Failed to save screenshot'
              }
            );
          } else {
            toast.error(result.message || 'Failed to save screenshot');
          }
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error('Failed to upload screenshot');
        }
      }, 'image/png', 0.9);

    } catch (error) {
      console.error('Screenshot error:', error);
      toast.error('Failed to capture screenshot');
    }
  };
  
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
        // toast.success("Code Saved Successfully");
        console.log(data.message);
        
        // After saving the code, capture and save screenshot
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
    const handleKeyDown = async(event) => {
      if(event.ctrlKey && event.key === 's'){
        event.preventDefault();
        updateCode();
        await saveScreenshot();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return() => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [htmlCode, cssCode, jsCode]); // Added dependencies to prevent stale closure

  const handleCodeChange = (setter) => (value) => {
    setter(value);
  };

  // Function to update iframe content without reloading
  const updateIframeContent = () => {
    if (!iframeRef.current) return;
    
    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
    // Create a new document structure
    const htmlContent = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>${htmlCode}</body>
        <script>${jsCode}</script>
      </html>
    `;

    // Write the content directly to the document
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
  };

  // Update iframe when code changes
  useEffect(() => {
    if (dataFetched) {
      updateIframeContent();
    }
  }, [htmlCode, cssCode, jsCode, dataFetched]);

  // Set iframe reference and initial content
  useEffect(() => {
    iframeRef.current = document.getElementById("iframe");
    if (dataFetched) {
      updateIframeContent();
    }
  }, [dataFetched]);

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
        setTitle(data.project.title || "Untitled Project");
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

  // Register editor functions when component mounts
  useEffect(() => {
    registerEditorFunctions({
      saveScreenshot,
      updateCode
    });
  }, []); // Empty dependency array since these functions don't change

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
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => {
                if (iframeRef.current && dataFetched) {
                  updateIframeContent();
                }
              }}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default EditorPage