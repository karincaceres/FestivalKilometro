import React from 'react'
import { useParams, Link } from 'react-router-dom'

const copy = {
  success: { title: '¡Pago aprobado!', body: 'Gracias por tu compra. Te enviamos tus entradas por email.' },
  pending: { title: 'Pago pendiente', body: 'Estamos esperando la confirmación del medio de pago.' },
  failure: { title: 'Pago fallido', body: 'No pudimos procesar tu pago. Probá nuevamente.' }
}

export default function CheckoutResult() {
  const { result } = useParams()
  const c = copy[result] ?? { title: 'Resultado', body: 'Estado desconocido.' }

  return (
    <div className="card" style={{textAlign:'center'}}>
      <h2 style={{marginTop:0}}>{c.title}</h2>
      <p className="muted">{c.body}</p>
      <Link className="btn" to="/">Volver al inicio</Link>
    </div>
  )
}