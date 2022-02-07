const DetailItem = ({ label, value }) => {
    return (
        <div className='flex w-full text-md md:text-xl items-center md:space-x-2 my-1'>
            <div className='flex w-32 justify-between items-center mx-2'>
                <h3 className=''>{label}</h3>
                <h6>:</h6>
            </div>
            <h3>{value}</h3>
        </div>
    )
}

export default DetailItem