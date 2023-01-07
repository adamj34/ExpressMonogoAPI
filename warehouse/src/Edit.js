import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Edit = () => {
  const navigate = useNavigate()
  const [updateMsg, setUpdateMsg] = React.useState('')
  const { id } = useParams()
  const [product, setProduct] = React.useState({})


  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          console.log("Failure:", response)
        }
      })
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Array.from(e.target.elements).reduce((acc, el) => {
			return { ...acc, [el.name]: el.value };
		}, {});
  
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.status === 204) {
        setUpdateMsg('Product updated successfully');
        console.log('Success:', response);
      } else {
        setUpdateMsg('Something went wrong');
        console.log("Failure:", response);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  

  const handleDelete = () => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status === 204) {
        setUpdateMsg('Product deleted successfully')
        navigate('/')
        console.log('Success:', response);
      } else {
        setUpdateMsg('Something went wrong');
        console.log("Failure:", response);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div>
      <h1>Edit product {id}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" id="name" name="name" defaultValue={product.name} />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input type="number" id="price" name="price" defaultValue={product.price} />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea id="description" name="description" defaultValue={product.description} />
        <br />
        <label htmlFor="quantity">Quantity</label>
        <br />
        <input type="number" id="quantity" name="quantity" defaultValue={product.quantity} />
        <br />
        <label htmlFor="unit">Unit</label>
        <br />
        <input type="text" id="unit" name="unit" defaultValue={product.unit} />
        <br />
        <br />
        <button type="submit">Save</button>
      </form>
      <p>{updateMsg}</p>
      <button onClick={() => handleDelete()}>Delete This Product</button>
    </div>
  )
}

export default Edit