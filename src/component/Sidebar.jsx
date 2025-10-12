import React from 'react'
import Progressbar from './ui_logic/Progressbar'
import { HugeiconsIcon } from '@hugeicons/react';
import { TaskDaily01Icon, PhoneCheckIcon, Clock01Icon } from '@hugeicons/core-free-icons';

const Sidebar = () => {
  return (
    <>
      <div class="flex gap-[20px] flex-col items-center pl-5 pr-5">
            <div class="w-[250px] grow mb2">
                <h2 class="text-xl font-semibold pt-6 pb-6 border-b-1 border-gray-300 mb-1">
                    My Tasks
                </h2>
                <div className='pt-3 pb-3 border-b-1 border-gray-300'>
                    <h3>Todays Progress</h3>
                    <div class="mt-1">
                    <Progressbar />
                    </div>
                </div>
            </div>


            <div class="w-[250px] grow mb-2">
                <h3 className='text-lg mb-2'>Categories</h3>
                <div>
                    <div className='flex justify-between mb-2'>
                        <div className='flex gap-2 align-center'>
                            <HugeiconsIcon
                                icon={TaskDaily01Icon}
                                size={18}
                                className=''
                            />
                            <p className='text-md text-center'>
                                All Tasks
                            </p>
                        </div>
                        <p className='p-1 w-[30px] rounded-2xl bg-gray-100 text-base text-center'>20</p>
                    </div>

                    <div className='flex justify-between mb-2'>
                        <div className='flex gap-2 align-center'>
                            <HugeiconsIcon
                                icon={Clock01Icon}
                                size={18}
                                className=''
                            />
                            <p className='text-md text-center mb-2'>
                                Active
                            </p>
                        </div>
                        <p className='p-1 w-[30px] rounded-2xl bg-gray-100 text-base text-center'>0</p>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex gap-2 align-center'>
                            <HugeiconsIcon
                                icon={PhoneCheckIcon}
                                size={18}
                                className=''
                            />
                            <p className='text-md text-center'>
                                Completed
                            </p>
                        </div>

                        <p className='p-1 w-[30px] rounded-2xl bg-gray-100 text-base text-center'>20</p>
                    </div>
                </div>
            </div>


            <div class="w-[250px] grow">
                <h3 className='text-lg mb-2'>Priority</h3>
                <div>
                    <div className='flex justify-between mb-2'>
                        <div className='flex gap-2 align-center'>
                            <div className='w-[8px] h-[8px] rounded-xl bg-red-500 mt-1.5'/>
                            <p className='text-base mb-2'>High</p>
                        </div>
                         <p className='p-1 w-[30px] rounded-2xl text-sm text-center'>10</p>                   
                    </div>

                    <div className='flex justify-between mb-2'>
                        <div className='flex gap-2 align-center'>
                            <div className='w-[8px] h-[8px] rounded-xl bg-yellow-500 mt-1.5'/>
                            <p className='text-base mb-2'>Medium</p>
                        </div>
                          <p className='p-1 w-[30px] rounded-2xl text-sm text-center'>2</p>                  
                    </div>

                    <div className='flex justify-between'>
                    <div className='flex gap-2 align-center'>
                        <div className='w-[8px] h-[8px] rounded-xl bg-blue-500 mt-1.5'/>
                        <p className='text-base'>Low</p>
                    </div>
                         <p className='p-1 w-[30px] rounded-2xl text-sm text-center'>8</p>                   
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default Sidebar
