import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav
        className="navbar navbar-dark bg-dark navbar-fixed"
        style={{ zIndex: "3" }}
      >
        <div className="logo navbar-collapse">
          <Link href="/">
            <div className="d-flex align-items-center">
              <i className="bi bi-shop text-info fs-1"></i>
              <h5
                className="text-white mb-0 mx-2"
                style={{ cursor: "pointer" }}
              >
                Shopping Web
              </h5>
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Link href="/cart">
              <div className="icon-nav">
                <i className="bi bi-cart text-info fs-4"></i>
                <p className="text-white mb-0">cart</p>
              </div>
            </Link>
            <Link href="/order">
              <div className="icon-nav">
                <i className="bi bi-box-seam text-info fs-5"></i>
                <p className="text-white mb-0">order</p>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
