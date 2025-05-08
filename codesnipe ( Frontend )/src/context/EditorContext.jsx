import React, { createContext, useContext } from 'react';

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [editorFunctions, setEditorFunctions] = React.useState({
    saveScreenshot: null,
    updateCode: null
  });

  const registerEditorFunctions = (functions) => {
    setEditorFunctions(prev => ({
      ...prev,
      ...functions
    }));
  };

  return (
    <EditorContext.Provider value={{ ...editorFunctions, registerEditorFunctions }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}; 