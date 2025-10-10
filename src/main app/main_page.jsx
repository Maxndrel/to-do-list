import React from 'react'

const main_page = () => {
  return (
    <div class="flex gap-[2%] flex-wrap content-start">
  <div class="w-full h-[5%]">Header</div>
  <div class="w-1/4 h-3/4">Sidebar</div>
  <div class="grow h-3/4">Content</div>
</div>
  )
}

export default main_page
