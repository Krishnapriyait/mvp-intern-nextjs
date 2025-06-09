import React from 'react';

export default function DonationList({ donations }) {
  const [filterType, setFilterType] = React.useState("All");

  const filteredDonations =
    filterType === "All"
      ? donations
      : donations.filter((d) => d.type === filterType);

  return (
    <div className="donation-list-wrapper">
      <h2>Donation Items</h2>

      <div className="filter-row">
        <label>Filter by Type:</label>
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="All">All</option>
          <option value="Cooked Food">Cooked Food</option>
          <option value="Packaged Food">Packaged Food</option>
          <option value="Fruits & Vegetables">Fruits & Vegetables</option>
          <option value="Dry Ration">Dry Ration</option>
          <option value="Beverages & Water">Beverages & Water</option>
          <option value="Essentials">Essentials</option>
        </select>
      </div>

      {filteredDonations.length === 0 ? (
        <p className="status-text">No donations found.</p>
      ) : (
        <ul className="donation-list">
          {filteredDonations.map((donation) => (
            <li key={donation.type} className="donation-card">
              <span className="donation-type">{donation.type}</span>
              <span className="donation-qty">Qty: {donation.quantity}</span>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .donation-list-wrapper {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          max-width: 600px;
          margin: 50px auto;
        }

        h2 {
          text-align: center;
          color: #6a994e;
          margin-bottom: 20px;
        }

        .filter-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .filter-row label {
          font-weight: 600;
          margin-right: 10px;
        }

        select {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .status-text {
          text-align: center;
          font-style: italic;
          color: #777;
          margin-top: 30px;
        }

        .donation-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .donation-card {
          display: flex;
          justify-content: space-between;
          padding: 14px 20px;
          background-color: #f9f9f9;
          border-left: 6px solid #6a994e;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .donation-type {
          font-weight: 600;
          color: #333;
        }

        .donation-qty {
          font-style: italic;
          color: #555;
        }
      `}</style>
    </div>
  );
}
