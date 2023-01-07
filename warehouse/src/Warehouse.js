import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Warehouse() {
	const [reportProducts, setReportProducts] = React.useState([]);
	const [reportTotal, setReportTotal] = React.useState('');
	const [productMsg, setProductMsg] = React.useState('');
	const [products, setProducts] = React.useState([]);
	const [sortOrder, setSortOrder] = React.useState(false);

	useEffect(() => {
		setProducts([...products].reverse())
	}, [sortOrder]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = Array.from(e.target.elements).reduce((acc, el) => {
			return { ...acc, [el.name]: el.value };
		}, {});

		fetch('http://localhost:3000/products', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
			body: JSON.stringify(data),
		})
		.then((response) => {
			if (response.status === 201) {
				setProductMsg('Product added successfully');
				return response.json()
			} else {
				setProductMsg('Product with this name already exists');
				console.log("Failure:", response)
			}
		})
		.then((data) => {
			console.log('Success:', data)
		})
		.catch((error) => {
			console.error('Error:', error);
		});

		e.target.reset();
	}

	const handleInsert = () => {
		fetch('http://localhost:3000/insert_sample', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => {
			if (response.status === 201) {
				return response.json()
			} else {
				console.log("Failure:", response)
			}
		})
		.then((data) => {
			console.log('Success:', data)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	const handleSearchName = () => {
		fetch('http://localhost:3000/products/name')
		.then(response => response.json())
		.then(data => {
			setProducts(data)
		})
	}

	const handleSearchPrice = () => {
		fetch('http://localhost:3000/products/price')
		.then(response => response.json())
		.then(data => {
			setProducts(data)
		})
	}

	const handleSearchQuantity = () => {
		fetch('http://localhost:3000/products/quantity')
		.then(response => response.json())
		.then(data => {
			setProducts(data)
		})
	}

	const handleReport = () => {
		fetch('http://localhost:3000/report')
		.then(response => response.json())
		.then(data => {
			setReportProducts(data.products)
			setReportTotal(`Total value of all products: ${data.totalValue}`)
		})
	}

  return (
    <div className="Warehouse">
      <h1>Warehouse</h1>

      <label htmlFor="insert_product">Insert sample products for test purposes</label>
      <br />
      <button id="insert_product" onClick={() => handleInsert()}>Insert</button>

      <form id="add_product" onSubmit={(e) => handleSubmit(e)}>
        <h2>Add product</h2>
        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="price">Price:</label>
        <br />
        <input type="number" id="price" name="price" />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea id="description" name="description"></textarea>
        <br />
        <label htmlFor="quantity">Quantity:</label>
        <br />
        <input type="number" id="quantity" name="quantity" />
        <br />
        <label htmlFor="unit">Unit:</label>
        <br />
        <input type="text" id="unit" name="unit" />
        <br />
        <br />
        <button type="submit" >Add</button>
      </form>
	  <p>{productMsg}</p>

      <h2>Search Products</h2>
      <label htmlFor="descending_sort">Sort order: </label>
      <button id="descending_sort" onClick={() => setSortOrder(!sortOrder)}>Click here to change the sort order</button>
      <br />

      <label htmlFor="search_name">See all products sorted by name:</label>
      <button id="search_name" onClick={() => handleSearchName()}>Search</button>
      <br />

      <label htmlFor="search_price">See all products sorted by price:</label>
      <button id="seach_price" onClick={() => handleSearchPrice()}>Search</button>
      <br />

      <label htmlFor="search_quantity">See all products sorted by quantity:</label>
      <button id="search_quantity" onClick={() => handleSearchQuantity()}>Search</button>
      <br />

			<p>Click on the product to edit it</p>
			<ul>
				{products.map((product) => (
					<li key={product._id}>
							<Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>{`name: ${product.name}, desc: ${product.description}, price: ${product.price},  quantity: ${product.quantity}, unit: ${product.unit}`}</Link>
					</li>
				))}
			</ul>

	<br />
	<button onClick={() => handleReport()}>Generate Report</button>	

	{reportProducts.map(product => (
		<div key={product._id}>
			<p>Product: {product._id}</p>
			<p>Quantity: {product.quantity}</p>
			<p>Total value: {product.totalValue}</p>
		</div>
	))}
	<p>{reportTotal}</p>

    </div>
  );
}

export default Warehouse;