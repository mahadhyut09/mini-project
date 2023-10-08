import React from 'react'

function Modal(props) {

    return (
        <>
        {
            props.isOpen?
            <div className='myModal'>
                <div className='bg-white rounded p-3'>
                    <p onClick={()=>props.handleClose()} className='text-end mb-0' style={{cursor: "pointer"}}>x</p>
                    {props.children}
                </div>
            </div>:
            <></>
        }
        </>
    )
}

export default Modal