import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

// const Header = () => {
export default function Header() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
        ></link>
      </Head>
      <nav className="navbar navbar-dark bg-dark navbar-fixed">
        <div className="logo navbar-collapse">
          <Link href="/">
            <i className="bi bi-shop text-info fs-1"></i>
          </Link>
          <div>
            <Link href="/cart">
              <i className="bi bi-cart text-info fs-5"></i>
            </Link>
            <i className="bi bi-person-circle text-info fs-5"></i>
          </div>
        </div>
      </nav>
    </>
  );
}
// export default Header;
