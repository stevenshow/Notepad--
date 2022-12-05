import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Icon from './assets/icons/Icon-Electron.png';

// eslint-disable-next-line react/prop-types
function AppBar({ content }) {
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
					<p className="text-md text-gray-300">NotePad--</p>
				</div>
				<div className="-my-1 inline-flex">
					<button
						onClick={window.Main.Minimize}
						className="undraggable pt-1 text-gray-500 hover:bg-gray-500 hover:text-white md:px-4 lg:px-3"
					>
						&#8211;
					</button>
					<button
						onClick={handleToggle}
						className="undraggable px-4 pt-1 text-gray-500 hover:bg-gray-500 hover:text-white lg:px-5"
					>
						{isMaximize ? '\u2752' : '⃞'}
					</button>
					<button
						onClick={window.Main.Close}
						className="undraggable px-4 pt-1 text-gray-500 hover:bg-red-500 hover:text-white"
					>
						&#10005;
					</button>
				</div>
			</div>
			<div className="fixed flex w-56 text-right">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-opacity-30 focus:outline-none ">
							File
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-gray-400 shadow-lg focus:outline-none">
							<div className="px-1 py-1 ">
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? 'bg-gray-600 text-white' : 'text-gray-900'
											} flex w-full rounded-md p-2 text-sm`}
										>
											New
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? 'bg-gray-600 text-white' : 'text-gray-900'
											} flex w-full rounded-md p-2 text-sm`}
											onClick={() => {
												content(window.Main.Open());
											}}
										>
											Open
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? 'bg-gray-600 text-white' : 'text-gray-900'
											} flex w-full rounded-md p-2 text-sm`}
										>
											Save
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
			{/* <div className="undraggable bg-gray-800 text-white">
				<div className="flex text-center">
					<button className="text-md w-8 hover:bg-gray-700">File</button>
					<button className="text-md w-8 hover:bg-gray-700">Edit</button>
				</div>
			</div> */}
		</>
	);
}

export default AppBar;
