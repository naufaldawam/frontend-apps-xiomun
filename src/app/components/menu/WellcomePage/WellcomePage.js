'use client'
import { useEffect, useState } from 'react';
import Header from '../../partials/header/HeaderComponent';
import ButtonOrderNow from '../../partials/button/ButtonOrderNowComponent';

const WellcomePage = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        fetch('https://115d30a6-1a4f-44f1-947f-dcdd65653e5f-00-7zythqgin1gd.worf.replit.dev/getMenuPremiumCoffe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'oke' }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status && data.result && data.result.menus) {
                    setMenus(data.result.menus);
                }
            })
            .catch((err) => {
                console.error('Error fetching premium menu:', err);
            });
    }, []);
    return (
        <div>
            <main className="bg-[#fef6ee] min-h-screen text-brown-900 scroll-smooth">

               <Header mode="welcome" />

                <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-gradient-to-b from-[#fce4c4] to-[#fff]  shadow-md">
                    <div className="md:w-1/2 space-y-4">
                        <h2 className="text-4xl font-bold text-[#723c16]">Natural Hand Make Xiomun Coffee</h2>
                        <p className="text-sm text-gray-700">Test the best coffee with your friends and family, boost your energy to fulfill day long with strong balance.</p>
                        <ButtonOrderNow style="bg-[#723c16] hover:bg-[#5c2f11] text-white px-4 py-2 rounded-sm shadow"/>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0">
                        <img
                            src="https://ik.imagekit.io/naufal/xiomun/Screenshot%202025-05-31%20at%2004.53.36_WrqnQKgrV.png?updatedAt=1748642226882"
                            alt="Coffee"
                            className="mx-auto w-[300px] h-auto"
                        />
                    </div>
                </section>

                <section className="text-center py-16 bg-[#fffaf3] rounded-xl my-10 mx-4 shadow-md">
                    <h3 className="text-2xl italic font-semibold text-[#4a2e14]">Enjoy your break time with friends and Xiomun coffee</h3>
                    <div className="flex justify-center space-x-6 mt-6">
                        {['Organic', 'Healthy', 'Energetic', 'Fresh'].map((text, i) => (
                            <div key={i} className="flex flex-col items-center text-black">
                                <div className="w-12 h-12 bg-[#723c16] rounded-full text-white flex items-center justify-center shadow">{text[0]}</div>
                                <span className="mt-2 text-sm">{text}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-[#fef0d9] py-16 px-6 rounded-xl my-10 mx-4 shadow-md">
                    <h4 className="text-xl font-semibold text-center mb-4 text-black">Different flavor</h4>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        There are many variations of passages of Xiomun Coffe, but the majority have suffered alteration in some form
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {menus.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white p-4 rounded-xl shadow hover:scale-105 transition-transform duration-200"
                            >
                                <div className="w-full h-40 bg-gray-200 rounded-lg mb-2" />
                                <h5 className="font-semibold text-center text-black">{item.name}</h5>
                                <p className="text-sm text-center text-gray-600">Rp {item.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* footer */}
                <section className="py-16 px-6 bg-white rounded-xl my-10 mx-4 shadow-md">
                    <h4 className="text-xl font-semibold text-center mb-4 text-black">Caught Me!</h4>
                    <div className="w-full max-w-4xl mx-auto h-64 rounded-xl overflow-hidden shadow">
                        <iframe
                            title="Xiomun Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.6270283283616!2d106.9882951842743!3d-6.5686692764705645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69b9ecd8d4b7ad%3A0x494defaf6437c9fc!2sKedai%20Kopi%20XIOMUN!5e0!3m2!1sid!2sid!4v1748662634578!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </section>

            </main>
        </div>
    )
}

export default WellcomePage;
