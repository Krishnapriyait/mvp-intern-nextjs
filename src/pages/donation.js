import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";

// ✅ Firebase Firestore imports
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const RouteMap = dynamic(() => import("../components/routemap"), {
  ssr: false,
  loading: () => <p style={{ color: "#007bff", fontWeight: "bold" }}>🗺️ Loading map preview...</p>,
});

export default function Donation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "2025-06-07",
    totalDonation: "",
    parcelName: "",
    count: "",
    totalAmount: "",
  });

  const [destination, setDestination] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [loadingMap, setLoadingMap] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ New state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const geocodeLocation = async (address) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // ✅ Prevent double-click
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "donations"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      alert("Thank you for your generous donation! Your food parcel will help someone in need.");

      const userDest = prompt("📍 Enter the destination location:");
      if (!userDest) {
        setIsSubmitting(false);
        return;
      }

      setLoadingMap(true);
      setDestination(userDest);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude, accuracy } = position.coords;

            if (accuracy > 1000) {
              const manualStart = prompt("⚠️ Location seems inaccurate. Enter your current location:");
              if (manualStart) {
                const manualLoc = await geocodeLocation(manualStart);
                if (manualLoc) {
                  setStartCoords([manualLoc.lat, manualLoc.lng]);
                } else {
                  setLocationError("⚠️ Could not find your location.");
                }
              }
            } else {
              setStartCoords([latitude, longitude]);
            }

            const destLoc = await geocodeLocation(userDest);
            if (destLoc) {
              setDestCoords([destLoc.lat, destLoc.lng]);
            } else {
              alert("⚠️ Destination not found!");
            }

            setLoadingMap(false);
            setIsSubmitting(false); // ✅ Reset
          },
          () => {
            setLocationError("❌ Location access denied or unavailable.");
            setLoadingMap(false);
            setIsSubmitting(false); // ✅ Reset
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        setLocationError("❌ Geolocation not supported by your browser.");
        setLoadingMap(false);
        setIsSubmitting(false);
      }
    } catch (err) {
      alert("❌ Failed to save donation. Please try again.");
      console.error("Firestore Error:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>DonAid - Food Donation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(to bottom right, #fffef7, #fefae0);
          color: #333;
        }
        header {
          background-color: #6a994e;
          padding: 20px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .logo {
          display: flex;
          align-items: center;
        }
        .logo img {
          height: 60px;
          margin-right: 10px;
        }
        nav {
          display: flex;
          gap: 15px;
        }
        nav a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
        }
        .container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 20px;
          display: flex;
          gap: 30px;
        }
        .cause-box, .donate-box, .recommend-box {
          background-color: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          flex: 1;
        }
        .donate-box {
          flex: 2;
        }
        h2 {
          color: #6a994e;
          margin-bottom: 15px;
        }
        .cause-box img {
          width: 100%;
          border-radius: 12px;
          margin-bottom: 10px;
        }
        form {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        input {
          flex: 1 1 45%;
          padding: 10px;
          border-radius: 6px;
          border: 2px solid #6a994e;
          font-size: 14px;
        }
        button {
          background-color: #2196f3;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 10px;
          cursor: pointer;
        }
        button[disabled] {
          opacity: 0.7;
          cursor: not-allowed;
        }
        button:hover:enabled {
          background-color: #1a78c2;
        }
        .recommend-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          background-color: #f0fdf4;
          padding: 10px;
          border-radius: 10px;
        }
        .recommend-item img {
          height: 50px;
          width: 50px;
          border-radius: 8px;
          margin-right: 10px;
          object-fit: cover;
        }
        footer {
          text-align: center;
          padding: 20px;
          background-color: #d4d4d4;
          color: #333;
          font-size: 14px;
          margin-top: 50px;
        }
      `}</style>

      <header>
        <div className="logo">
          <img src="/logo.jpg" alt="DonAid Logo" />
          <h1>DonAid</h1>
        </div>
        <nav>
          <Link href="/">Home</Link>
          <a href="/#about">About Us</a>
          <Link href="/hunger">Hungers</Link>
          <Link href="/donor">Donors</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <div className="container">
        <div className="cause-box">
          <h2>Causes Details</h2>
          <img src="/logo.jpg" alt="Food Donation" />
          <p><strong>Food Pack</strong> ₹100 / Person</p>
          <p>Your donation helps feed families with essential food like rice, pulses, oil, and veggies.</p>
        </div>

        <div className="donate-box">
          <h2>Donate For Food Pack</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Donor Name*" required />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email address*" required />
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone*" required />
            <input name="date" type="date" value={formData.date} onChange={handleChange} required />
            <input name="totalDonation" value={formData.totalDonation} onChange={handleChange} placeholder="Total Donation" />
            <input name="parcelName" value={formData.parcelName} onChange={handleChange} placeholder="Name of Parcel*" required />
            <input name="count" type="number" value={formData.count} onChange={handleChange} placeholder="Count*" required />
            <input name="totalAmount" value={formData.totalAmount} onChange={handleChange} placeholder="Total Amount*" required />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "⏳ Please wait..." : "DONATE NOW"}
            </button>
          </form>

          {locationError && <p style={{ color: "red" }}>{locationError}</p>}

          {loadingMap && (
            <p style={{ color: "green", fontWeight: "bold", marginTop: "10px" }}>
              🛰️ Fetching live location & generating route...
            </p>
          )}

          {startCoords && destCoords && !loadingMap && (
            <>
              <h3 style={{ marginTop: "20px", color: "#007bff" }}>🗺️ Live Route Preview</h3>
              <RouteMap start={startCoords} end={destCoords} />
            </>
          )}
        </div>

        <div className="recommend-box">
          <h2>Recommended Causes</h2>
          {[{ img: "/water.jpg", text: "Water Bottles ₹20 / Person" },
            { img: "/snack.jpg", text: "Snacks Pack ₹50 / Kit" },
            { img: "/familykit.jpg", text: "Family Food Kit ₹250 / Family" },
            { img: "/breakfast.jpg", text: "Breakfast ₹30 / Person" },
            { img: "/fruitpack.jpg", text: "Fruit Pack ₹60 / Child" },
          ].map((item, idx) => (
            <div key={idx} className="recommend-item">
              <img src={item.img} alt={item.text} />
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <footer>&copy; 2025 DonAid. All rights reserved.</footer>
    </>
  );
}
