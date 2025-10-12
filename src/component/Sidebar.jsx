import React from 'react'
import Progressbar from './ui_logic/Progressbar'
import { HugeiconsIcon } from '@hugeicons/react';
import { TaskDaily01Icon, PhoneCheckIcon, Clock01Icon } from '@hugeicons/core-free-icons';

const Sidebar = () => {
  return (
    <>
      <div class="flex gap-[20px] flex-col items-center pl-5 pr-5">
            <div class="w-[250px] grow">
                <h2 class="text-xl font-semibold pt-6 pb-6 border-b-1 border-gray-300">
                    My Tasks
                </h2>
                <div className='pt-3 pb-3 border-b-1 border-gray-300'>
                    <h3>Todays Progress</h3>
                    <div class="mt-1">
                    <Progressbar />
                    </div>
                </div>
            </div>


            <div class="w-[250px] grow">
                <h3 className='text-lg mb-2'>Categories</h3>
                <div>
                    <div className='flex gap-1 align-center'>
                        <HugeiconsIcon
                            icon={TaskDaily01Icon}
                            size={18}
                            className=''
                        />
                        <p className='text-md text-center mb-1'>
                            All Tasks
                        </p>
                    </div>

                    <div className='flex gap-1 align-center'>
                        <HugeiconsIcon
                            icon={Clock01Icon}
                            size={18}
                            className=''
                        />
                        <p className='text-md text-center mb-1'>
                            Active
                        </p>
                    </div>

                    <div className='flex gap-1 align-center'>
                        <HugeiconsIcon
                            icon={PhoneCheckIcon}
                            size={18}
                            className=''
                        />
                        <p className='text-md text-center mb-1'>
                            Completed
                        </p>
                    </div>
                </div>
            </div>


            <div class="w-[250px] grow">
                <h3 className='text-lg mb-2'>Priority</h3>
                <div>
                    <div className='flex gap-1 align-center'>
                        <div className='w-[8px] h-[8px] rounded-xl bg-red-500'/>
                        <p className='text-base text-center mb-1'>High</p>
                    </div>
                    <p className='text-base mb-1'>Medium</p>
                    <p className='text-base mb-1'>Low</p>
                </div>

            </div>
        </div>
    </>
  )
}

export default Sidebar
