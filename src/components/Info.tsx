import React from 'react';

type Props = {
    msn: string;
    bg: string;
}

const Info: React.FC<Props> = ({ msn, bg }) => {
    const classe = `rounded-lg p-2 ${ bg }`;

    return (
        <div className='fixed top-0 left-0 mt-3 w-screen bg-transparent flex justify-center animate-move'>
            <span className={ classe }>{ msn }</span>
        </div>
    )
}

export default Info;