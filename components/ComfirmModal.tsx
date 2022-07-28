import { Button, Modal } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import Link from "next/link";

export default function ComfirmModal(props: any) {
  return (
    <>
      <Modal show={props.show} onHide={props.hide}>
        <Modal.Body className={styles.card_modal}>
          <h5>{props.message}</h5>
          <div className={styles.btn_div}>
            <Link href="/order">
              <Button
                className="align-item-items-stretch px-1 btn btn-success"
                style={{ width: "150px" }}
                onClick={() => {
                  props.hide();
                  props.handleOrder();
                }}
              >
                YES
              </Button>
            </Link>
            <Button
              className="align-item-items-stretch px-1 btn btn-danger"
              style={{ width: "150px" }}
              onClick={props.hide}
            >
              NO
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
