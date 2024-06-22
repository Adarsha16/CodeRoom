import React, { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react';
import LanguageSwitch from './LanguageSwitch';
import { useSelector } from 'react-redux';
import { socket } from './Chat.jsx';
import { selectModeClick } from '../../store/modeSlice.js';


function Textbox(
  {
    type = "input",
    customcss,
    textarea_id,
    textarea_name,
    disabled,
    // default_lng,
    custom_theme,
    _grid = ""
     
  }



) {

  const [LanguageSelected, setLanguageSelected] = useState({ extension: ".js", language: "javascript", file_name: "index" })


  const [OutputText, putOutputText] = useState('');
  const [InputText, putInputText] = useState("//comment here");

  const roomStatus = useSelector(state => state.room.roomStatus);
  const roomLanguages = useSelector(state => state.room.roomLanguages);


  const outputref = useRef(OutputText);
  const monacoref = useRef(null);
  let isVertical = useSelector(selectModeClick);




  /////////////////////////////////////Socket/////////////////////////////////////////////


  useEffect(() => { //change to default display text when user is not in a room
    if (roomStatus) return;
    if (!roomStatus) {
      console.log("USER IS NOT IN A ROOM NOW CHANGING: \n")
      console.log("Room status changed to ", roomStatus);
      console.log("Current language: ", LanguageSelected);
      putInputText("//comment here");
      putOutputText("");
      setLanguageSelected({ extension: ".js", language: "javascript", file_name: "index" });
    }
  }, [roomStatus]);


  useEffect(() => {


    console.log("opening on inputfield")

    if (!roomStatus) {
      return;
    };


    socket.emit("InputField", { InputText });

    ////////////

    const handleSocketInputFieldForInputText = ({ InputText }) => {

      console.log("server to client input", { InputText })
      putInputText(InputText);
    }


    socket.on("InputField", handleSocketInputFieldForInputText);


    return () => {
      socket.off("InputField", handleSocketInputFieldForInputText);
    };

  }, [InputText, roomStatus]);





  useEffect(() => {

    if (!roomStatus) {
      return;
    };

    // if (OutputText) {
    socket.emit("OutputField", { OutputText });
    // }

    ////////////////////
    const handleSocketOutputFieldForOutputText = ({ OutputText }) => {

      console.log("server to client output", { OutputText })
      putOutputText(OutputText);
    }

    // if (OutputText && roomStatus) {
    socket.on("OutputField", handleSocketOutputFieldForOutputText)
    // }



    return () => {
      socket.off("OutputField", handleSocketOutputFieldForOutputText);
    };

  }, [OutputText, roomStatus])


  /////////////////////////////////////Language switch/////////////////////////////////////////////



  const handleLanguageSwitch = (button) => {

    const { extension } = button;
    console.log("EXTENSION: ", extension)

    let language;

    switch (extension) {
      case ".cpp":
        language = 'cpp';
        break;
      case ".py":
        language = 'python';
        break;
      case ".js":
        language = 'javascript';
        break;
      default:
        language = 'javascript';
    }

    //monaco.editor.setModelLanguage(monaco.editor.getModels()[0], language);
    setLanguageSelected({ extension, language });

    console.log(`Changed language to ${language}`);
  }


  useEffect(() => {
    if (!roomStatus) return;

    console.log("roomLanguages:", roomLanguages);

    socket.emit('roomUpdate', { roomLanguages });
    socket.emit('languageRetrieval', { roomLanguages });

    Object.keys(roomLanguages).forEach(roomId => {
      const { language } = roomLanguages[roomId];
      console.log(`Room ID: ${roomId}, Language: ${language}`);
      let language_ = language;
      socket.emit('languageChange', { language_ })

      console.log("CREATED A ROOM. CHANGING LANGUAGE TO: ", language);


      setLanguageSelected(prev => ({
        ...prev,
        extension: getExtension(language),
        language: language
      }));
    });

    const handleLanguageChange = ({ language_ }) => {
      console.log("Received language change from server:", language_);

      setLanguageSelected(prev => ({
        ...prev,
        extension: getExtension(language_),
        language: language_
      }));
    };

    // Listen for languageChange events from server
    socket.on('languageChange', handleLanguageChange);

    // Clean up event listener when component unmounts
    return () => {
      socket.off('languageChange', handleLanguageChange);
    };

  }, [roomLanguages, roomStatus])



  const getExtension = (language) => {
    switch (language) {
      case "cpp":
        return ".cpp";
      case "python":
        return ".py";
      case "javascript":
        return ".js";
      default:
        return ".js";
    }
  };


  /////////////////////////////////////File name change/////////////////////////////////////////////


  const handleFileNameInputChange = (e) => {

    let file_name = e.target.value;
    setLanguageSelected((prev) => {
      return {
        ...prev, file_name
      }
    })
  }




  /////////////////////////////////////Save file//////////////////////////////////////////
  const SaveFileFn = () => {


    let FileName = `${LanguageSelected.file_name || "index"}${LanguageSelected.extension}`;
    let FileContent = InputText;

    const blob = new Blob([FileContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = FileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  /////////////////////////////////////call api to compile////////////////////////////////

  const callCompilerApi = async (e) => {

    try {

      e.preventDefault();
      let extension = LanguageSelected.extension;
      console.log(extension)

      const response = await fetch(`http://localhost:5001/api/code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ InputText, extension }),
        })

      console.log("vanilla response", response)
      const { Output } = await response.json();

      console.log("no  jsoned Output", response);
      console.log("jsoned Output", Output);

      putOutputText(Output || "");



      /***
       * GLOT API version 
      */

      /*
         const response = await fetch(`http://localhost:5001/api/code/${LanguageSelected.language}`,
           {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({ InputText, extension })
           }
   
         )
   
   
         const data = await response.json();
   
         console.log("data", data)
   
         putOutputText(data.output?.stdout || data?.output?.stderr || data.python_output);
         */

    } catch (error) {

      console.log(error);

    }
  };


  /////////////////////////////////////Monaco editor//////////////////////////////
  const handleMonacoInstance = (editor, monaco) => {

    monacoref.current = monaco;


  }
  useEffect(() => {
    // Function to determine file extension based on language
    const getExtension_ = (language) => {
      switch (language) {
        case "cpp":
          console.log("yaya1")
          return ".cpp";
        case "python":
          console.log("yaya2")
          return ".py";
        case "javascript":
          console.log("yaya3")
          return ".js";
        default:
          console.log("yaya4")
          return ".js"; // Default to ".js" if the language is not recognized
      }
    };

    // Set extension based on current language
    setLanguageSelected(prev => ({
      ...prev,
      extension: getExtension_(prev.language),
    }));

  }, [LanguageSelected.language]);


  useEffect(() => {

    try {
      if (!monacoref.current) {
        // Monaco or its dependencies not available yet, wait and try again later
        return;
      }

      if (OutputText !== outputref.current) {
        monacoref.current?.editor.getModels()[1].setValue(OutputText || "illegal argument")
      }



    } catch (error) {

      console.log(error)

    }



  }, [OutputText]);


  useEffect(() => {
    console.log("CURRENT VALUES: ", LanguageSelected)
  }, [LanguageSelected]);

  return (
    < div className={`text-customWhite bg-secondary w-full ${_grid}`
    }>

      {/*NOTE; Tab Area */}
      < div
        className={`px-6 h-10 border-[2px]  border-r-0 border-brown flex items-center ${customcss.flex_alignment} fira-sans-bold`}
      >
        {
          type === "input" ?

            (
              <>
                {/* For Left part of input */}
                <div className='flex flex-row gap-5 items-center'>
                  {
                    <LanguageSwitch handleLanguageSwitch={handleLanguageSwitch}
                      handleFileNameInputChange={handleFileNameInputChange}
                      currentLanguage={LanguageSelected} />
                  }
                </div>


                {/* Right part */}
                <div className='flex gap-4 items-center cursor-pointer' >
                  <span
                    className=' px-3 py-1 rounded-lg hover:scale-90 transition-all'
                    onClick={SaveFileFn}
                  >
                    Save
                  </span>


                  <span
                    className='text-primary py-1 px-4 rounded-lg hover:scale-90 transition-all'
                    onClick={callCompilerApi}
                  >
                    Run
                  </span>

                </div>

              </>

            )

            :

            // Output section
            isVertical ? (
              <div className='px-6 h-10 border-brown flex items-center font-bold'>
                Output
              </div>
            ) :
              (
                <div className='z-50 border border-brown w-screen bg-secondary py-2 -mx-6' >
                  <p className='pl-4'>Output</p>
                </div>
              )
        }

      </div >


      {/*NOTE; Input Area */}
      < div>
        <Editor
          id={textarea_id}
          name={textarea_name}
          className={`${textarea_id} overflow-y-scroll no-scrollbar border-[2px] border-t-0 border-r-0  border-brown h-[calc(100vh-96px)] outline-none bg-secondary resize-none overflow-auto scroll-m-0 p-0 w-full`}

          loading={"Loading...."}

          language={LanguageSelected.language}
          // defaultLanguage={default_lng}
          // defaultValue={""}

          options={{
            minimap: { enabled: true },
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
              handleMouseWheel: true,
            },
            cursorBlinking: "expand",
            autoIndent: "full",
            tabFocusMode: true,
            formatOnPaste: true,
            smoothScrolling: true,
            readOnly: disabled

          }}

          theme={custom_theme}

          value={textarea_id === "inputarea" ? InputText : OutputText}

          onChange={textarea_id === "inputarea" ? putInputText : putOutputText}
          onMount={handleMonacoInstance}
        >

        </Editor>

      </div >



    </div >
  )
}

export { Textbox }