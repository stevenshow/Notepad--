import React, { useState } from 'react';

import Icon from './assets/icons/Icon-Electron.png';

function AppBar() {
	const [isMaximize, setMaximize] = useState(false);

	const handleToggle = () => {
		if (isMaximize) {
			setMaximize(false);
		} else {
			setMaximize(true);
		}
		window.Main.Maximize();
	};

	return (
		<>
			<div className="draggable flex justify-between bg-gray-800 py-0.5">
				<div className="inline-flex">
					<img className="h-6 lg:-ml-2" src={Icon} alt="Icon of Electron" />
					<p className="text-md text-gray-500">NotePad--</p>
				</div>
				<div className="-my-1 inline-flex">
					<button
						onClick={window.Main.Minimize}
						className="undraggable pt-1 hover:bg-gray-500 md:px-4 lg:px-3"
					>
						&#8211;
					</button>
					<button onClick={handleToggle} className="undraggable px-6 pt-1 hover:bg-gray-500 lg:px-5">
						{isMaximize ? '\u2752' : '⃞'}
					</button>
					<button
						onClick={window.Main.Close}
						className="undraggable px-4 pt-1 hover:bg-red-500 hover:text-white"
					>
						&#10005;
					</button>
				</div>
			</div>
			<div className="undraggable bg-gray-800 text-white">
				<div className="flex text-center">
					<button
						className="text-md w-8 hover:bg-gray-700"
						onClick={() => {
							console.log('File');
						}}
					>
						File
					</button>
					<button
						className="text-md w-8 hover:bg-gray-700"
						onClick={() => {
							console.log('Edit');
						}}
					>
						Edit
					</button>
				</div>
			</div>
		</>
	);
}

export default AppBar;
