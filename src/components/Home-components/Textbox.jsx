import React, { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react';
import LanguageSwitch from './LanguageSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from './Chat.jsx';
// import useDebounce from '../../custom_fn/debounce.js';


function Textbox(
  {
    type = "input",
    customcss,
    textarea_id,
    textarea_name,
    disabled,
    default_lng,
    custom_theme,
    _grid = ""

  }

) {


  const [InputText, putInputText] = useState('//Comment here');
  const [OutputText, putOutputText] = useState('');

  /////////For Room only
  const dispatch = useDispatch();
  const roomStatus = useSelector(state => state.room.roomStatus);

  //Custom debounce
  // const debouncedInputText = useDebounce(InputText, 300); /////////Debounced




  useEffect(() => {


    console.log("opening on inputfield")

    if (!roomStatus) {
      return;
    };

    socket.emit("InputField", { InputText });

    ////////////

    const handleSocketInputFieldForInputText = ({ InputText }) => {

      console.log("server to client", { InputText })
      putInputText(InputText);
    }

    socket.on("InputField", handleSocketInputFieldForInputText);

    return () => {
      socket.off("InputField", handleSocketInputFieldForInputText);
    };

  }, [InputText, roomStatus])




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
























  const outputref = useRef(OutputText);
  const monacoref = useRef(null);

  const SaveFileFn = () => {

    let FileName = 'My_file.js';
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



  const callCompilerApi = async () => {

    try {


      const response = await fetch(`http://localhost:5001/api/code/python`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ InputText })
        }

      )


      const data = await response.json();

      putOutputText(data.output.stdout || data.output.stderr);

    } catch (error) {

      console.log(error);

    }
  };


  const handleMonacoInstance = (editor, monaco) => {

    monacoref.current = monaco;
    // console.log(monacoref.current.editor.getModels())


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
                <div className='flex flex-row gap-5'>

                  <div>
                    <LanguageSwitch />

                  </div>




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
            (
              <div className='px-6 h-10 border-brown flex items-center font-bold'>
                Output
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
          defaultLanguage={default_lng}
          // defaultValue={placeholder}

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
          // value={(e) => e.target.value}

          onChange={textarea_id === "inputarea" ? putInputText : putOutputText}
          onMount={handleMonacoInstance}
        >

        </Editor>

      </div >



    </div >
  )
}

export { Textbox }