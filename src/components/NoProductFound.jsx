import { Link } from 'react-router-dom';
import img from '../assets/images/noproductFound.jpg';

const NoProductFound = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center '>
            <img src={img} alt="" />
            <Link to="/" className='text-xl font-semibold'>Go Home</Link>
        </div>
    );
};

export default NoProductFound;