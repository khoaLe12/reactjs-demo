import { memo } from 'react'

function MemoContent1() {

    console.log('re-render')

    return (
        <h2>Hello ae</h2>
    )
}

function MemoContent2({ onIncrease }) {
    console.log('re-render')

    return (
        <>
            <h2>Hello ae</h2>
            <button onClick={onIncrease}>Click me!</button>
        </>
    )
}

export const MemoContentExport1 = memo(MemoContent1)
export const MemoContentExport2 = memo(MemoContent2)