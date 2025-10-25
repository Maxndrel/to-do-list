import React from 'react'
import Progressbar from './ui_logic/Progressbar'
import { HugeiconsIcon } from '@hugeicons/react';
import { TaskDaily01Icon, PhoneCheckIcon, Clock01Icon } from '@hugeicons/core-free-icons';

const Sidebar = ({ tasks, setFilter, filter }) => {
  return (
    <>
      <div className="flex gap-[10px] flex-col items-center pl-5 pr-5">
            <div className="w-[250px] grow">
                <div className='pt-3 '>
                    <h2 className="text-xl text-white font-semibold py-5 pl-2 mb-2 rounded-md bg-sky-950">
                        My Tasks
                    </h2>
                </div>
                <div className='py-3 border-y-1 border-gray-300'>
                    <h3>Todays Progress</h3>
                    <div className="mt-1">
                    <Progressbar totalTasks={tasks.length} completedTasks={tasks.filter(task => task.isDone).length} />
                    </div>
                </div>
            </div>


            <div className="w-[250px] grow mb-1">
                <h3 className='text-md text-white font-semibold py-2 pl-2 rounded-md mb-2 bg-sky-950'>Categories</h3>
                <div>
                    <button onClick={() => setFilter('all')} className={`flex justify-between w-full p-2 rounded ${filter === 'all' ? 'bg-gray-200' : ''}`}>
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
                        <p className='p-1 w-[30px] rounded-2xl bg-gray-100 text-base text-center'>{tasks.length}</p>
                    </button>

                    <button onClick={() => setFilter('active')} className={`flex justify-between w-full p-2 rounded ${filter === 'active' ? 'bg-gray-200' : ''}`}>
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
                        <p className='p-1 w-[30px] rounded-2xl bg-gray-100 text-base text-center'>{tasks.filter(task => !task.isDone).length}</p>
                    </button>

                    <button onClick={() => setFilter('completed')} className={`flex justify-between w-full p-2 rounded ${filter === 'completed' ? 'bg-gray-200' : ''}`}>
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

                        <p className='p-1 w-[30px] rounded-2xl bg-gray-100 text-base text-center'>{tasks.filter(task => task.isDone).length}</p>
                    </button>
                </div>
            </div>


            <div className="w-[250px] pb-4.5 grow">
                <h3 className='text-md text-white font-semibold py-2 pl-2 rounded-md mb-2 bg-sky-950'>Priority</h3>
                <div>
                    <button onClick={() => setFilter('low')} className={`flex justify-between w-full p-2 rounded ${filter === 'low' ? 'bg-gray-200' : ''}`}>
                    <div className='flex gap-2 align-center'>
                        <div className='w-[8px] h-[8px] rounded-xl bg-blue-500 mt-1.5'/>
                        <p className='text-base'>Low</p>
                    </div>
                         <p className='p-1 w-[30px] rounded-2xl text-sm text-center'>{tasks.filter(task => task.priority === 'Low').length}</p>
                    </button>

                    <button onClick={() => setFilter('medium')} className={`flex justify-between w-full p-2 rounded ${filter === 'medium' ? 'bg-gray-200' : ''}`}>
                        <div className='flex gap-2 align-center'>
                            <div className='w-[8px] h-[8px] rounded-xl bg-yellow-500 mt-1.5'/>
                            <p className='text-base mb-2'>Medium</p>
                        </div>
                          <p className='p-1 w-[30px] rounded-2xl text-sm text-center'>{tasks.filter(task => task.priority === 'Medium').length}</p>
                    </button>

                    <button onClick={() => setFilter('high')} className={`flex justify-between w-full p-2 rounded ${filter === 'high' ? 'bg-gray-200' : ''}`}>
                        <div className='flex gap-2 align-center'>
                            <div className='w-[8px] h-[8px] rounded-xl bg-red-500 mt-1.5'/>
                            <p className='text-base mb-2'>High</p>
                        </div>
                         <p className='p-1 w-[30px] rounded-2xl text-sm text-center'>{tasks.filter(task => task.priority === 'High').length}</p>
                    </button>
                </div>

            </div>
        </div>
    </>
  )
}

export default Sidebar
