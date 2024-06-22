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


  const outputref = useRef(OutputText);
  const monacoref = useRef(null);
  let isVertical = useSelector(selectModeClick);


  /////////////////////////////////////Socket/////////////////////////////////////////////
  const roomStatus = useSelector(state => state.room.roomStatus);


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


  // useEffect(() => {

  //   if (!roomStatus) {
  //     return;
  //   }

  //   const handleFirstRoomInputText = ({ InputText }) => {
  //     console.log("Room enter input terxt", InputText)
  //     putInputText(InputText);

  //   }

  //   socket.on("room_InputText", handleFirstRoomInputText);

  //   return () => {
  //     socket.off("room_InputText", handleFirstRoomInputText)
  //   }

  // }, [roomStatus])




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
    console.log(extension)

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

    monaco.editor.setModelLanguage(monaco.editor.getModels()[0], language);

    setLanguageSelected({ extension, language });
  }


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

  const callCompilerApi = async () => {

    try {

      let extension = LanguageSelected.extension;
      console.log(extension)

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

      putOutputText(data.output.stdout || data.output.stderr);

    } catch (error) {

      console.log(error);

    }
  };


  /////////////////////////////////////Monaco editor//////////////////////////////
  const handleMonacoInstance = (editor, monaco) => {

    monacoref.current = monaco;


  }



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
                    <LanguageSwitch handleLanguageSwitch={handleLanguageSwitch} handleFileNameInputChange={handleFileNameInputChange} />
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
                <div className='absolute w-full flex justify-center items-center top-[calc(100vh/5)] mt-64 -ml-6 h-16 pb-1'>
                  <div className='w-full bg-secondary-200 px-4 py-2  bg-secondary border-[2px]  border-r-0 border-l-0 border-brown'>
                    <h1 className='text-1xl font-bold w-full'>Output</h1>
                  </div>
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