// "use client";

// import React, { useEffect, useState } from "react";


// const ConfirmationCheckoutPage = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     // Simulasikan ambil cart dari localStorage / context
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
//             <button className="mt-6 w-full bg-[#a35e20] text-white py-2 rounded hover:bg-[#723c16]">
//               Lanjut ke pembayaran
//             </button>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }

// export default ConfirmationCheckoutPage;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ConfirmationCheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
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
