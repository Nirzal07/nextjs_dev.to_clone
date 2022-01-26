import Link from 'next/link'
import { useContext } from 'react';
import { AuthContext } from '../lib/context';

export default function Navbar({  }) {
    const { user, username } = useContext(AuthContext);
    
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link href='/'>
                        <button>FEED</button>
                    </Link>
                </li>
                {
                    username && (
                        <>
                        <li>
                            <Link href='/admin'>
                                <button className='btn-blue'>
                                    WRITE POSTS
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                            {/* {user?.photoURL} */}
                                <img src={user?.photoURL} />
                            </Link>
                        </li>
                        </>
                    )
                }
                {
                    !username && (
                        <>
                        <li>
                            <Link href='/enter'>
                                <button className='btn-blue'>
                                    Log In
                                </button>
                            </Link>
                        </li>
                        </> 
                    )
                }
            </ul>     
        </nav>
         )
  };