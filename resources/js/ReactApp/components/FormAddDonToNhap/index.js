import React, { useState } from 'react'

export default function FormAddDonToNhap(props) {
  const [maDH, setMaDH] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setMaDH("");
    props.onSubmit(maDH);
  }
  return (
    <form action="" method="POST" role="form" onSubmit={e => handleSubmit(e)}>
      <input type="text" className="form-control" id="" placeholder="Nhập vào mã đơn và Enter để kiểm tra đơn hàng đơn hàng" 
        value={maDH}
        onChange={e=>setMaDH(e.target.value)}
      />
    </form>
  )
}
