import Model from "./Model"
//// model error 

const ModelFail = ({ result, setResult }) => {
    const clickAway = () => {
        setResult({ ...result, fail: false, msg: '' })
    }

    return (
        <Model clickAway={clickAway}>
            <div className='w-full flex justify-center items-center mt-28 flex-col'>

                <div className='p-8 bg-red-600 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h4 className='text-2xl text-red-500 font-light'>OOP's</h4>

                <p className=''>{result?.msg}</p>
            </div>
        </Model>
    )
}

//// model success

const ModelSuccess = ({ result, setResult }) => {

    const clickAway = () => {
        setResult({ ...result, success: false, msg: '' })
    }

    return (
        <Model clickAway={clickAway}>
            <div className='w-full flex justify-center items-center mt-28 flex-col'>

                <div className='p-8 bg-green-600 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h4 className='text-2xl text-green-500 font-light'>congratulations</h4>

                <p className="mx-2 text-center">{result?.msg}</p>
            </div>
        </Model>
    )
}



const ControllModel = ({ result, setResult }) => {

    return (
        <div>
            {
                result?.success &&
                <ModelSuccess result={result} setResult={setResult} />
            }

            {
                result?.fail &&
                <ModelFail result={result} setResult={setResult} />
            }
        </div>
    )
}

export default ControllModel
