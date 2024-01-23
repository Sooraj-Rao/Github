import { useEffect, useState } from 'react'

const Topbar = ({ Data, setData }) => {
    const [Input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const [repoData, userData] = await Promise.all([
                fetch(`https://api.github.com/users/${Input}/repos`),
                fetch(`https://api.github.com/users/${Input}`)
            ])
            const repos = await repoData.json();
            const user = await userData.json();
            if (user?.message == 'Not Found' && repos?.message == 'Not Found') {
               return console.log('User Not Found');
            }
            setData({ repos, user })
        } catch (error) {
            // console.log(error);
        }
    }



    // https://api.github.com/users/Sooraj-Rao/repos?page=1&per_page=2

    return (
        <div className=' flex justify-center py-10 bg-slate-200'>
            <form onSubmit={handleSubmit} className=' flex gap-x-10 justify-center w-full'>
                <input
                    className=' p-1 outline-none focus:border-blue-300 border-2 border-blue-100'
                    type="text" placeholder='Enter user' autoFocus value={Input} onChange={(e) => setInput(e.target.value)} />
                <button
                    className=' bg-blue-500 text-white px-4 font-medium hover:bg-blue-600 focus:bg-blue-600 text-sm rounded-md'
                >Search</button>
            </form>
        </div>
    )
}

export default Topbar