import React, { useState } from 'react';
import AppBar from './AppBar';

function App() {
	const [fileContent, setFileContent] = useState<string | null>(null);

	return (
		<div className="flex h-screen flex-col">
			{window.Main && (
				<div className="flex-none">
					<AppBar fileContent={setFileContent} />
				</div>
			)}
			<div className="flex-auto">
				<div className=" flex h-full flex-col items-center justify-center space-y-4 bg-gray-800">
					<h1 className="text-2xl text-gray-200">Vite + React + Typescript + Electron + Tailwind</h1>
					<h2 className="text-xl text-gray-200">File Content:</h2>
					<p className="border-1 container border border-gray-500 p-2 text-lg text-white">{fileContent}</p>
				</div>
			</div>
		</div>
	);
}

export default App;
