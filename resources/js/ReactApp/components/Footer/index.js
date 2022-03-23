import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import style from './Footer.module.scss'


export default function Footer() {
  return (
    <div className={clsx("row", style.footer)} id="footer">
      <div className={clsx("col-6 col-m-6 col-s-12", style.left)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.name)}>Công Ty TNHH TLA EXPRESS</div>
          <div className={clsx("col-12 col-m-12 col-s-12", style.address)}>Số **, Triệu Thị Trinh, Phường Bình Khánh, Long Xuyên, An Giang</div>
          <div className={clsx("col-12 col-m-12 col-s-12", style.phone)}>
            <a href="tel:+0358744125">0358744125</a>
          </div>
          <div className={clsx("col-12 col-m-12 col-s-12", style.mail)}>
            <a href="mailto:abc@mail.com">abc@mail.com</a>
            </div>
        </div>
      </div>
      <div className={clsx("col-6 col-m-6 col-s-12", style.right)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.copyright)}>Copyright © 2022 TLA EXPRESS</div>
          <div className={clsx("col-12 col-m-12 col-s-12", style.design)}>
            <a href="https://huynhvangioiem.github.io/TLA_Library/" target="_blank">Develop by TLAIT</a>
          </div>
        </div>
      </div>
    </div>
  )
}
