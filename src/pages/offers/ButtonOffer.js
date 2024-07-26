import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { Modal, Button, Form } from "react-bootstrap";
import { headersExport } from "~/data/Constants";
import { Row, Col } from "react-bootstrap";

export default function ButtonOffer({ dataOffer }) {
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleExport = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFromDate("");
    setToDate("");
  };

  const handleSubmit = () => {
    if (!fromDate || !toDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if (startDate > endDate) {
      alert("Start date must be before or equal to end date.");
      return;
    }

    const filtered = dataOffer.filter((offer) => {
      const offerDate = new Date(offer.dueDate);
      return offerDate >= startDate && offerDate <= endDate;
    });

    if (filtered.length === 0) {
      alert("No offer on the selected date");
    } else {
      // Nếu có dữ liệu, tự động kích hoạt xuất CSV
      document.getElementById("csvLink").click();
      setShowModal(false);
    }
  };

  return (
    <div className="changed">
      <div className="offer-button">
        <Link
          className="button-form"
          style={{ marginRight: "10px" }}
          to="/offer/add"
        >
          Add New
        </Link>
        <Button className="button-form" onClick={handleExport}>
          Export Offer
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <h3 className="text-center">Export Offer</h3>
        <div className="modal-input">
          <Form className="modal-form">
            <Row>
              <Col >
                <Form.Group className="modal-date">
                  From
                  <Form.Control
                    size="sm"
                    className="w-50"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="modal-date">
                  To
                  <Form.Control
                    size="sm"
                    className="w-50"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="offer-button btn-modal ">
          <button className="button-form" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="button-form" onClick={handleSubmit}>
            Export
          </button>
        </div>
        <CSVLink
          id="csvLink"
          style={{ display: "none" }}
          enclosingCharacter={``}
          separator=";"
          headers={headersExport}
          filename="Offerlist"
          data={dataOffer.filter((offer) => {
            const offerDate = new Date(offer.dueDate);
            return (
              offerDate >= new Date(fromDate) && offerDate <= new Date(toDate)
            );
          })}
        />
      </Modal>
    </div>
  );
}
