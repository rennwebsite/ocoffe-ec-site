import React, { useState, useEffect } from "react"
import axios from "axios"
import { Button, Form } from "react-bootstrap"
import { API_URL } from "../utils/constans"

const CekOrder = () => {
  const [orders, setOrders] = useState([])
  const [codeOrder, setCodeOrder] = useState("")
  const [orderProduct, setOrderProduct] = useState(null)

  useEffect(() => {
    axios
      .get(API_URL + "orders")
      .then((res) => {
        setOrders(res.data) // Simpan langsung data dari API
      })
      .catch((err) => {
        console.log("eror bang\n" + err)
      })
  }, [])
  const submitCekOrder = (e) => {
    e.preventDefault()

    // Cari order berdasarkan ID
    const searchOrder = orders.find((v) => v.id === codeOrder)

    if (searchOrder) {
      setOrderProduct(searchOrder)
      setCodeOrder("")
    } else {
      console.log("Data tidak ditemukan")
    }
  }

  return (
    <div>
      {" "}
      <Form onSubmit={submitCekOrder} className="shadow p-4 bg-white rounded-2">
        <h2 className="text-center">Cek order</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Code Order</Form.Label>
          <Form.Control
            type="text"
            value={codeOrder}
            onChange={(e) => setCodeOrder(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {orderProduct &&
        orderProduct.menus.map((menu) => {
          return <div key={menu.id}>{menu.product.name} - {menu.quantity}</div>
        })}
    </div>
  )
}

export default CekOrder
