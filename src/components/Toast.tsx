type Props = {
    msn: string;
    txtBtn: string;
    onClose: () => void;
}

const Toast: React.FC<Props> = ({ msn, txtBtn, onClose }) => {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-900/80 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg flex w-max h-max flex-col max-w-[600px]">
                <p className=" text-lg font-bold mb-3">{ msn }</p>
                <div className="flex justify-end">
                    <button
                        className="bg-red-400 p-2 rounded hover:bg-red-500 text-white"
                    >{ txtBtn }</button>
                    <button
                        onClick={ onClose }
                        className="bg-gray-200 p-2 ml-2 rounded hover:bg-gray-300">Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default Toast;