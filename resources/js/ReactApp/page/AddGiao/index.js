import React from 'react'

export default function AddGiao() {
  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <FormDiemGD
        dgdEditting={dgdEditting}
        onSubmit={handleSubmit}
        onCancleEdit={handleCancleEdit}
        onEdit={handleEdit}
      />
    </div>
  )
}
