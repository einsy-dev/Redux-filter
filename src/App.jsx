import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

export default function App() {
    const dispath = useDispatch();
    const state = useSelector(state => state);
    const [type, setType] = useState('Add')

    const [filter, setFilter] = useState('')
    const [data, setData] = useState([])

    function DispatchAdd() {
        if (!document.getElementById('textInput').value.trim()) return
        if (type === 'Add') {
            dispath({ type: 'ADD', payload: document.getElementById('textInput').value, filter: document.getElementById('filterInput').value })
            document.getElementById('textInput').value = ''
        }
        else {
            dispath({ type: 'EDIT', payload: { id: type, value: document.getElementById('textInput').value } })
            setType('Add')
            document.getElementById('textInput').value = ''
        }
    }

    function DispatchEdit(item, index) {
        document.getElementById('textInput').value = item;
        document.getElementById('textInput').focus();
        setType(index)
    }

    useEffect(() => {
        setData(state.filter(item => item.toLowerCase().includes(filter) || filter === ''))
    }, [filter, state])

    return (
        <div className="container my-4 p-0">
            <div className="input-group mb-3">
                <input onKeyDown={(e) => e.key === 'Enter' && DispatchAdd()} type="text" className="form-control" id='textInput' />
                <span className="input-group-text">
                    <button onClick={() => DispatchAdd()} className="btn btn-outline-primary me-2 py-1">Save</button>
                    <button onClick={() => { document.getElementById('textInput').value = '', setType('Add') }} className="btn btn-outline-danger py-1">Cancel</button>
                </span>
            </div>
            <div className="input-group mb-3 w-25">
                <input onChange={e => setFilter(e.target.value.trim().toLowerCase())} type="text" className="form-control" id='filterInput' />
            </div>
            <div className="">
                <ul className="list-group list-group-flush">
                    {data?.map((item, index) =>
                        <li className="list-group-item" key={index} style={{ userSelect: 'none' }}>
                            <span>{item}</span>
                            <button onClick={() => DispatchEdit(item, index)} className="btn btn-outline-primary me-2 mx-2 py-0">&#9999;</button>
                            <button onClick={() => { dispath({ type: 'DELETE', payload: index }) }} className="btn btn-outline-danger py-0">&#128465;</button>
                        </li>
                    )}
                </ul>
            </div>
        </div >
    )
}
