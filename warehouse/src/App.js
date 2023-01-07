import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Warehouse from './Warehouse.js';
import Edit from './Edit.js';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Warehouse/>}/>
				<Route path="/products/:id" element={<Edit/>}/>
			</Routes>
	</Router>
	)
}
export default App;


