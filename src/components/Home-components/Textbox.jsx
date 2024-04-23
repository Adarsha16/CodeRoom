import React from 'react'

function Textbox(
  {
    type = "input",
    customcss,
    textarea_id,
    textarea_name,
    disabled

  }

) {
  return (


    < div className={`col-start-${customcss.colstart} col-end-${customcss.colend}  text-customWhite bg-secondary `
    }>
      {console.log(type, disabled)}
      {console.log()}

      {/*NOTE; Tab Area */}
      < div
        className={`px-0 h-10 border-[2px]  border-r-0 border-brown flex items-center ${customcss.flex_alignment} font-bold`}
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
                <div className='flex gap-3'>
                  <span>Save</span>
                  <span className='text-primary'>Run</span>
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
      < div className='m-0 p-0 ' >


        <textarea
          id={textarea_id}
          name={textarea_name}
          className={` border-[2px] border-t-0 border-r-0  border-brown h-[calc(100vh-96px)] outline-none bg-secondary resize-none overflow-auto scroll-m-0 p-4 `}

          disabled={disabled}

        // placeholder={placeholderText}
        // value={text}
        // onChange={inputText((event) => { event.target.value })}


        >


        </textarea>
      </div >






    </div >
  )
}

export { Textbox }