
"use client";

import React, { useEffect, useState } from "react";

const PaymentPage = () => {
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || cart.length === 0) {
      setError("Mohon lengkapi data dan pastikan keranjang tidak kosong.");
      return;
    }

    const data = {
      name,
      phone,
      paymentMethod,
      items: cart,
      total,
    };

    setCheckoutData(data);
    setShowModal(true);
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#fef6ee] text-[#723c16] py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Checkout Pesanan</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Keranjang kosong.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ringkasan */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h3>
              <ul className="divide-y">
                {cart.map((item) => (
                  <li key={item.id} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right font-bold text-lg">
                Total: Rp {total.toLocaleString("id-ID")}
              </div>
            </div>

            {/* Form Input */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama"
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Nomor Telepon</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxx"
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div>
              <label className="block font-medium mb-2">Metode Pembayaran</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="qris">QRIS</option>
                <option value="transfer">Transfer Bank</option>
                <option value="cod">Bayar di Tempat (COD)</option>
              </select>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full bg-[#a35e20] text-white py-3 rounded hover:bg-[#723c16] font-semibold"
            >
              Konfirmasi & Bayar
            </button>
          </form>
        )}
      </div>

      {/* Modal */}
      {showModal && checkoutData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-center text-[#a35e20]">
              Menunggu pembayaran, jangan tutup laman ini
            </h3>
            <pre className="bg-gray-100 text-sm text-left p-4 rounded max-h-80 overflow-auto">
              {JSON.stringify(checkoutData, null, 2)}
            </pre>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-[#a35e20] text-white py-2 rounded hover:bg-[#723c16]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PaymentPage;





// "use client";

// import React, { useEffect, useState } from "react";

// const PaymentPage = () => {
//   const [cart, setCart] = useState([]);
//   const [isClient, setIsClient] = useState(false);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("qris");
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [checkoutData, setCheckoutData] = useState(null);

//   useEffect(() => {
//     setIsClient(true);
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   if (!isClient) return null;

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name || !phone || cart.length === 0) {
//       setError("Mohon lengkapi data dan pastikan keranjang tidak kosong.");
//       return;
//     }

//     setError("");
//     const data = {
//       name,
//       phone,
//       paymentMethod,
//       items: cart,
//       total,
//     };

//     setCheckoutData(data);
//     setShowModal(true);
//   };

//   return (
//     <main className="min-h-screen bg-[#fef6ee] text-[#723c16] py-10 px-6">
//       <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-3xl font-bold mb-6 text-center">Checkout Pesanan</h2>

//         {cart.length === 0 ? (
//           <p className="text-center text-gray-600">Keranjang kosong.</p>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h3>
//               <ul className="divide-y">
//                 {cart.map((item) => (
//                   <li key={item.id} className="py-3 flex justify-between">
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                     </div>
//                     <p className="text-sm font-semibold">
//                       Rp {(item.price * item.quantity).toLocaleString("id-ID")}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//               <div className="mt-4 text-right font-bold text-lg">
//                 Total: Rp {total.toLocaleString("id-ID")}
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium mb-1">Nama Lengkap</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Nomor Telepon</label>
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block font-medium mb-2">Metode Pembayaran</label>
//               <select
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2"
//               >
//                 <option value="qris">QRIS</option>
//                 <option value="transfer">Transfer Bank</option>
//                 <option value="cod">Bayar di Tempat (COD)</option>
//               </select>
//             </div>

//             {error && <p className="text-red-500 text-sm">{error}</p>}

//             <button
//               type="submit"
//               className="w-full bg-[#a35e20] text-white py-3 rounded hover:bg-[#723c16] font-semibold"
//             >
//               Konfirmasi & Bayar
//             </button>
//           </form>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg text-center relative">
//             <h3 className="text-xl font-bold mb-4 text-[#a35e20]">
//               Menunggu pembayaran
//             </h3>
//             <p className="mb-4 text-sm text-gray-600">
//               Jangan tutup laman ini sampai pembayaran selesai.
//             </p>
//             <pre className="bg-gray-100 text-left text-sm p-4 rounded max-h-64 overflow-y-auto">
//               {JSON.stringify(checkoutData, null, 2)}
//             </pre>
//             <button
//               onClick={() => setShowModal(false)}
//               className="mt-4 bg-[#a35e20] text-white px-4 py-2 rounded hover:bg-[#723c16]"
//             >
//               Tutup
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default PaymentPage;
