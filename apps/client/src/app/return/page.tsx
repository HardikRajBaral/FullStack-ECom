const ReturnPage = async({searchParams}:{searchParams:Promise<{session_id:string}>| undefined})=>{
    const session_id=(await searchParams)?.session_id

    if(!session_id){
        return <div>No session ID provided.</div>
    }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`)
    const data = await res.json()

    return (
        <div>
            <h1>Return Page</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default ReturnPage