import React, { useState, useEffect } from 'react'

function Textbox(
  {
    type = "input",
    customcss,
    textarea_id,
    textarea_name,
    disabled

  }

) {

  const [InputText, putInputText] = useState('');
  const [OutputText, putOutputText] = useState('');


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


  useEffect(() => {

    document.getElementById("outputarea").innerHTML = OutputText;


  }, [OutputText]);



  return (




    < div className={`col-span-2 text-customWhite bg-secondary w-full`
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
                    js
                  </div>

                  <div>
                    main.js
                  </div>


                </div>

                {/* Right part */}
                <div className='flex gap-3 cursor-pointer' >
                  <span>Save</span>
                  <span className='text-primary' onClick={callCompilerApi}>Run</span>
                  <span>...</span>
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


        <textarea
          id={textarea_id}
          name={textarea_name}
          className={` border-[2px] border-t-0 border-r-0  border-brown h-[calc(100vh-96px)] outline-none bg-secondary resize-none overflow-auto scroll-m-0 p-4 w-full`}

          disabled={disabled}



          // placeholder={textarea_id === "outputarea" ? OutputText : " "}



          onChange={(e) => { putInputText(e.target.value) }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              e.target.setRangeText('\t', e.target.selectionStart, e.target.selectionStart, 'end')
            }
          }}


        >


        </textarea>

      </div >



    </div >
  )
}

export { Textbox }