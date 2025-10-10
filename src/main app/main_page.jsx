import React from 'react'

const main_page = () => {
  return (
    <div class="flex gap-[1%] flex-wrap content-stretch justify-center flex-col">
      {/* left side or side bar */}
      <div class="w-[30%] h-full">
      1
      </div>
      
      {/* right side */}
      <div class="container w-[70%] h-full">
        <div class="item">Header</div>
        <div class="item">Content</div>
      
      </div>
    </div>
  )
}

export default main_page
