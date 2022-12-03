import React, { useEffect, useState } from 'react';
import AppBar from './AppBar';

function App() {
	console.log(window.ipcRenderer);

	const [isOpen, setOpen] = useState(false);
	const [isSent, setSent] = useState(false);
	const [fromMain, setFromMain] = useState<string | null>(null);

	const handleToggle = () => {
		if (isOpen) {
			setOpen(false);
			setSent(false);
		} else {
			setOpen(true);
			setFromMain(null);
		}
	};
	const sendMessageToElectron = () => {
		if (window.Main) {
			window.Main.sendMessage("Hello I'm from React World");
		} else {
			setFromMain('You are in a Browser, so no Electron functions are available');
		}
		setSent(true);
	};

	useEffect(() => {
		if (isSent && window.Main)
			window.Main.on('message', (message: string) => {
				setFromMain(message);
			});
	}, [fromMain, isSent]);

	return (
		<div className="flex h-screen flex-col">
			{window.Main && (
				<div className="flex-none">
					<AppBar />
				</div>
			)}
			<div className="flex-auto">
				<div className=" flex h-full flex-col items-center justify-center space-y-4 bg-gray-800">
					<h1 className="text-2xl text-gray-200">Vite + React + Typescript + Electron + Tailwind</h1>
					<button
						className="rounded bg-yellow-400 py-2 px-4 shadow hover:bg-yellow-200 focus:outline-none"
						onClick={handleToggle}
					>
						Click Me
					</button>
					{isOpen && (
						<div className="flex flex-col items-center space-y-4">
							<div className="flex space-x-3">
								<h1 className="text-xl text-gray-50">
									💝 Welcome 💝, now send a message to the Main 📩📩
								</h1>
								<button
									onClick={sendMessageToElectron}
									className=" rounded bg-green-400 px-4 py-0 hover:bg-green-300 focus:outline-none"
								>
									Send
								</button>
							</div>
							{isSent && (
								<div>
									<h4 className=" text-green-500">Message sent!!</h4>
								</div>
							)}
							{fromMain && (
								<div>
									{' '}
									<h4 className=" text-yellow-200">{fromMain}</h4>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
