import { h1 } from 'motion/react-client';
import React, { useEffect } from 'react'
import { use } from 'react';

const SearchPractice = () => {
    const array = [
        {
            id: 1,
            name: "Siddhartha Shrestha",
            role: "developer"
        },
        {
            id: 2,
            name: "Hari Shrestha",
            role: "engineer"
        }
    ]

    const [searchdata, setSearchData] = React.useState("");
    const [data, setData] = React.useState(array);

    useEffect(() => {
        if (searchdata === "") {
            setData(array);
        }
        else {
            const filter = array.filter((item) => item.name.toLowerCase().includes(searchdata.toLowerCase()));
            setData(filter);
        }
    }, [searchdata, array]);



    return (
        <div>
            <input className='text-black' type="text" onChange={(e) => setSearchData(e.target.value)} />
            <h1 className='text-3xl text-white'> Data Found BOlte</h1>
            {searchdata.length !== 0 && (
                data.map((user) =>
                    <h1 className='text-white'>{user.name}</h1>
                )
            )
            }
        </div>
    )
}

export default SearchPractice