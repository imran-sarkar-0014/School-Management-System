import React from 'react'

const FooterList = (props) => {
    return (
        <div className='text-center py-4'>
            <h3 className='text-2xl font-medium text-gray-100'>{props.header}</h3>
            <ul>{props.children}</ul>
        </div>
    )
}

const FooterItem = (props) => {
    return (
        <li className='cursor-pointer text-gray-400 text-lg hover:underline py-2'>{props.children}</li>
    )
}

const CommonFooter = () => {
    return (
        <div className='bg-gray-800 h-auto overflow-x-hidden py-24 mt-auto'>
            <div className='max-w-[60rem] mx-auto grid md:grid-cols-3'>
                <FooterList header="Security & Brand">
                    <FooterItem>Report Copyright Infringement</FooterItem>
                    <FooterItem>Report Security Issue</FooterItem>
                    <FooterItem>Trademark Notice</FooterItem>

                </FooterList>
                <FooterList header='Website'>
                    <FooterItem>Accessibility</FooterItem>
                    <FooterItem>Digital Accessibility</FooterItem>
                    <FooterItem>Privacy Statement</FooterItem>
                </FooterList>
                <FooterList header='Get in Touch'>
                    <FooterItem>Contact with us</FooterItem>
                    <FooterItem>Maps & Directions</FooterItem>
                    <FooterItem>Jobs</FooterItem>
                </FooterList>
            </div>
        </div>
    )
}

export default CommonFooter
