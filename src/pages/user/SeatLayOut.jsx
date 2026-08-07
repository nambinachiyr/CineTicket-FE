import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import showInstance from '../../axioInstances/user/showInstance';
import { contextValue } from '../../contextvaluses/ContextValue';
import LoadSpin from '../../components/user/LoadSpinButton';
import LoadSpinContent from '../../components/user/LoadSpinContent';
import paymentInstance from '../../axioInstances/user/paymentInstance';
import openRazorPay from '../../utils/razorPay/RazorOrder';
import backArrow from "../../assets/left-arrow.png"

const SeatLayOut = () => {
  const navi = useNavigate();
  const { showid, showDate, showTime } = useParams();
  const { contextEmail } = useContext(contextValue);
  const [load, setLoad] = useState(false);
  const [isprocess, setIsprocess] = useState(false)
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [showPopUp, setShowPopUp] = useState(false)

  console.log(contextEmail, 'Email');

  useEffect(() => {
    async function getShow() {
      try {
        setLoad(true);
        const response = await showInstance.get(`/${showid}`);
        // console.log(response?.data)
        setShow(response?.data?.show);
        return setLoad(false);
      } catch (err) {
        console.log(err.message);
        return [];
      }
    }
    getShow();
  }, [showid]);

  const row = [...new Set(show?.seats?.map((s) => s.row))];

  function handleSeatBooking(seat) {
    if (seat.status === 'booked' || seat.heldBy) {
      return;
    }
    if (!contextEmail) {
      return setError('Please LogIn First');
    }
    setSelectedSeats((prev) => {
      //Find If the seat is already there or not
      const alreadySelected = prev.some(
        (s) => s.seatNumber === seat.seatNumber,
      );
      // If have then leave that seat only
      if (alreadySelected) {
        return prev.filter((s) => s.seatNumber !== seat.seatNumber);
      }
      return [...prev, seat];
    });
  }

  async function handlePay_Booking() {
    setShowPopUp(true)
  }

  // Booking Function
  async function handle_proceed() {
    setShowPopUp(false)
    const seats = selectedSeats.map((s) => s.seatNumber);
    console.log(seats);
    try {
      setLoad(true)
      setIsprocess(true)
      //   const ok = window.confirm("Proceed to payment ? ")
      //   if(!ok) return;
      const response = await paymentInstance.post('/create-order', {
        showId: showid,
        seatNumbers: seats,
      });
      console.log("CREATE ORDER RES : ", response?.data)
      const order = response?.data?.order;
      console.log(order, "ORDER");
      return openRazorPay(order, showid, seats, navi, setLoad, setIsprocess);
    } catch (err) {
      console.log(err.response);
      setLoad(false)
      setIsprocess(false)
    }
    
  }

  console.log(show)
  // Link For LogIn Page
  if (show && !contextEmail) {
    function handleLogin() {
      navi('/login', { state: { from: `/${showid}/${showDate}/${showTime}` } });
    }
    return (
      <div className="flex flex-col justify-center tracking-wider items-center bg-gray-200 min-h-screen">
        <p>{error}</p>
        <button
          onClick={handleLogin}
          to={'/login'}
          className="text-blue-500 text-lg underline hover:cursor-pointer "
        >
          LogIn
        </button>
      </div>
    );
  }

  // SeatLayOut Design
  return (
    <>
      <div className="bg-neutral-100  px-2 pt-4 relative">
        <img onClick={() => navi(-1)} className='p-2  hover:cursor-pointer transition-all duration-300 hover:scale-75 hover:bg-amber-100 rounded-full' src={backArrow} alt="" />

        {isprocess && (
          <div className="fixed bg-black/40 inset-0 flex justify-center items-center ">
            <LoadSpinContent />
          </div>
        )}
        {
          showPopUp && <div className='absolute inset-0 border flex justify-center items-center'>
            <div className='w-2xs md:w-2xl p-2 px-3 flex flex-col gap-3 md:gap-6 justify-center items-center border bg-yellow-300/80 border-gray-400 rounded-ee-[60px] rounded-ss-[60px] '>
              <h1 className='text-xl md:text-2xl'>Confirm Booking</h1>
              <div className='flex md:text-xl flex-col flex-wrap gap-2 md:gap-4'>
                <p className='flex flex-wrap'>Seats : [{selectedSeats.map((s, index) => <span key={s.seatNumber} className='flex flex-row'>{s.seatNumber}{selectedSeats.length - 1 === index ? "" : ','}</span>)}]</p>
                <p className='font-semibold'>Total : ₹{show.price * selectedSeats.length}</p>
              </div>
              <p className='flex gap-8 md:text-lg'>
                <span className='border py-1 px-3 rounded-sm hover:cursor-pointer hover:bg-yellow-600 hover:shadow-lg' onClick={() => setShowPopUp(false)}>Cancel</span>
                <span className='border py-1 px-3 rounded-sm hover:cursor-pointer hover:bg-yellow-600 hover:shadow-lg' onClick={handle_proceed}>Proceed</span>
              </p>
            </div>
          </div>
        }

        <div className="flex flex-col gap-12 min-h-screen justify-center items-center">
          <h1 className=" text-xl ">
            Price - <span>₹{show?.price}</span>
          </h1>
          <div className="flex ">
            <p className=" border w-7 lg:w-15 lg:text-3xl bg-gray-400 text-white border-gray-400 justify-center items-center mb-2 lg:mb-6 flex flex-col gap-5 lg:gap-10  rounded-2xl">
              {row.map((r) => (
                <span
                  key={r}
                  className={`${selectedSeats?.some((s) => s.row === r) ? 'text-green-900 text-3xl' : ''}`}
                >
                  {r}
                </span>
              ))}
            </p>

            <div className="grid grid-cols-10 lg:text-xl md:text-[17px] gap-3 lg:gap-8 p-3 justify-items-center">
              {show?.seats?.map((s) => (
                <p
                  onClick={() => handleSeatBooking(s)}
                  key={s.seatNumber}
                  className={`hover:cursor-pointer ${selectedSeats?.some((seat) => seat.seatNumber === s.seatNumber) ? 'border-green-400 border-4 border-dashed text-white' : `${s.status === 'booked' ? 'bg-gray-400  hover:cursor-not-allowed text-gray-400 text-xs' : `${s.heldBy && s.heldBy !== contextEmail ? 'border-yellow-400 border-4 border-dashed' : ''}`}`} w-8 lg:w-10 lg:h-10 h-8 rounded-sm text-neutral-700 rounded-se-xl border text-center flex justify-center items-center `}
                >
                  {s.column}
                </p>
              ))}
              <p></p>
            </div>
          </div>

          <div className="flex gap-5 items-center md:text-[17px] lg:text-lg justify-center text-neutral-800  ">
            <div className="flex flex-col justify-center items-center ">
              <p
                className={`w-5 h-5  rounded-full border-2 border-gray-400 bg-gray-400 `}
              ></p>
              <span>Sold</span>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <p className="w-5 h-5 rounded-full border-2 border-neutral-700"></p>
              <span>available</span>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <p className="w-5 h-5 bg-yellow-500 rounded-full border-2 border-yellow-500"></p>
              <span>Filling Fast</span>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <p className="w-5 h-5 rounded-full border-2 border-green-500 bg-green-500"></p>
              <span>selected</span>
            </div>
          </div>

          <div className="lg:text-xl md:text-[16px">
            {selectedSeats?.length > 0 && (
              <div className="flex flex-col items-center justify-center">
                <div className="flex text-lg font-bold">
                  [
                  {selectedSeats?.map((s, index) => (
                    <p key={s.seatNumber} className="font-semibold">
                      {' '}
                      {s.seatNumber}{' '}
                      <span>
                        {index !== selectedSeats.length - 1 ? ',' : ''}
                      </span>{' '}
                    </p>
                  ))}
                  ]
                </div>
                <p className="font-light">
                  {selectedSeats?.length}{' '}
                  <span>
                    {selectedSeats?.length > 1 ? 'seats' : 'seat'}
                  </span>{' '}
                </p>
              </div>
            )}

            <button
              onClick={handlePay_Booking} disabled={selectedSeats.length === 0}
              className={`border min-w-2xs p-3 text-lg bg-blue-400 text-gray-50 tracking-widest font-bold rounded-t-3xl rounded-e-2xl hover:shadow-olive-500 hover:shadow-2xl  hover:cursor-pointer ${selectedSeats.length === 0 ? "hover:cursor-not-allowed opacity-50 " : "shadow-2xl"}`}
            >{load ? <LoadSpin /> : "Confirm & Pay"}

            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatLayOut;
