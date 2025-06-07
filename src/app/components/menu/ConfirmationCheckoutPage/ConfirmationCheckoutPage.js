// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const ConfirmationCheckoutPage = () => {
//   const [cart, setCart] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleNext = () => {
//     router.push("/payment");
//   };

//   return (
//     <main className="min-h-screen bg-[#fef6ee] text-[#723c16] py-10 px-6">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Check your pesanan</h2>

//         {cart.length === 0 ? (
//           <p className="text-center text-gray-600">Tidak ada item dalam keranjang.</p>
//         ) : (
//           <>
//             <ul className="divide-y">
//               {cart.map((item) => (
//                 <li key={item.id} className="py-4 flex justify-between">
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                   </div>
//                   <p className="font-semibold">
//                     Rp {(item.price * item.quantity).toLocaleString("id-ID")}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-6 border-t pt-4 text-right">
//               <p className="text-lg font-bold">
//                 Total: Rp {total.toLocaleString("id-ID")}
//               </p>
//             </div>
//             <button
//               onClick={handleNext}
//               className="mt-6 w-full bg-[#a35e20] text-white py-2 rounded hover:bg-[#723c16]"
//             >
//               Lanjut ke pembayaran
//             </button>
//           </>
//         )}
//       </div>
//     </main>
//   );
// };

// export default ConfirmationCheckoutPage;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ConfirmationCheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [paymentChannels, setPaymentChannels] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Ambil cart dari localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    // Fetch payment channel dari backend
    fetch("https://f581c9bb-5ce0-4e12-b4c2-c2c04e2ed04a-00-3bemsrk26jok6.riker.replit.dev/getPaymentChannelAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "get payment" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Full response:", data);

        const channels =
          data?.result?.["Response from tripay (get payment channel) "]?.data || [];

        console.log("Parsed payment channels:", channels);

        setPaymentChannels(channels);
      })
      .catch((err) => {
        console.error("Error fetching payment channels:", err);
      });
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNext = () => {
    router.push("/payment");
  };

  return (
    <main className="min-h-screen bg-[#fef6ee] text-[#723c16] py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Check your pesanan</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Tidak ada item dalam keranjang.</p>
        ) : (
          <>
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex justify-between">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4 text-right">
              <p className="text-lg font-bold">
                Total: Rp {total.toLocaleString("id-ID")}
              </p>
            </div>

            {/* Tampilkan daftar channel pembayaran */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Pilih Metode Pembayaran</h3>
              {paymentChannels.length === 0 ? (
                <p className="text-gray-500">Memuat metode pembayaran...</p>
              ) : (
                paymentChannels.map(channelGroup => (
                  <div key={channelGroup.group_id} className="mb-6">
                    <h4 className="text-lg font-bold mb-3">{channelGroup.group_name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {channelGroup.payment.map(method => (
                        <label
                          key={method.code}
                          className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#a35e20] transition-all gap-4"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.code}
                            className="form-radio text-[#a35e20] accent-[#a35e20]"
                          />
                          <img
                            // src={`https://tripay.co.id/images/payment-channel/${method.code.toLowerCase()}.png`}
                            alt={method.name}
                            className="w-12 h-12 object-contain"
                            // onError={e => {
                            //   e.target.onerror = null; // prevent infinite loop
                            //   e.target.src = "/placeholder.png";
                            // }}
                          />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={handleNext}
              className="mt-6 w-full bg-[#a35e20] text-white py-2 rounded hover:bg-[#723c16]"
            >
              Lanjut ke pembayaran
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default ConfirmationCheckoutPage;
