import { useReducer, useState, useRef } from 'react'
import reducer, { initState } from './reducer.js'
import { setJob, addJob, deleteJob } from './actions.js'
import logger from './logger.js'


function Bai21_Content() {
    const [state, dispatch] = useReducer(logger(reducer), initState);
    const { job, jobs } = state;

    const inputRef = useRef();

    const handleSubmit = () => {
        dispatch(addJob(job))
        dispatch(setJob(''))
        inputRef.current.focus()
    }

    return (
        <>
            <h3>Todo</h3>
            <input
                placeholder='Enter todo...'
                ref={inputRef}
                value={job}
                onChange={e => {
                    dispatch(setJob(e.target.value))
                }}
            />
            <button onClick={handleSubmit}>Add</button>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        {job}
                        <span onClick={() => dispatch(deleteJob(index))}>
                            &times;
                        </span>
                    </li>
                ))}
            </ul>
        </>
    )
}
function Bai21() {
    const [show, setShow] = useState(false);
    return (
        <div>
            <button onClick={() => setShow(!show)} style={{ marginBottom: '10px' }}>Toggle</button>
            <br />
            {show && <Bai21_Content />}
        </div>
    )
}

export default Bai21