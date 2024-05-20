import arrowimage from '../../src/assets/Arrow 1.svg';
// import Image from 'next/image';
export default function Submitbutton(props) {
    return (
        <div onClick={props.handleSignIn}
            className={`${props.message==='Share'?'':'mt-6'} flex flex-row items-center dark:bg-cyan-700 dark:border-cyan-600 border-cyan-100 dark:hover:bg-black hover:bg-black font-semibold mb-2  items-center justify-center rounded-full border-2 bg-white py-2 px-8 text-center transition-all hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent uppercase cursor-pointer`}>
            <div
                className="text-white text-center py-2 flex-grow text-lg font-semibold">
                {props.message}
            </div>
            <div className="px-4">
                <img src={arrowimage} width={20} height={0} alt='-->'></img>
            </div>
        </div>
    )
}
