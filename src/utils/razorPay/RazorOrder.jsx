
import bookingInstance from "../../axioInstances/user/bookingInstance"

function openRazorPay(order,showid,seats,navi,setLoad){
    // console.log(showid,"rezorPay Order")
    console.log(order,"RazorPay")
    // console.log(seats,"rezorPay Order")
    console.log(import.meta.env.VITE_RAZORPAY_KEY_ID,"R_Key")
    console.log(window.Razorpay,"object")
    const option = {
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        name:"Cine Tickets",
        description:"Tickets Booking",
        order_id:order.id,
        handler:async function (response) {
            // console.log(response,"respones")
            try{
                setLoad(true)
            const book =await bookingInstance.post('/verify-payment',
                {
                    showId:showid,
                    seatNumbers:seats,
                    razorpay_order_id:response.razorpay_order_id,
                    razorpay_payment_id:response.razorpay_payment_id,
                    razorpay_signature:response.razorpay_signature
                }
            )
            console.log(book?.data?.newBook?._id)
            const bookingId = book?.data?.newBook?._id
            if(bookingId){

                navi(`/booking-success/${bookingId}`)
            }
        }
            catch(err){
                console.log("VERIFY",err.response?.data)
            }
            finally{
                setLoad(false)
            }
        },
        theme:{color:"#2563eb"}
    }
    console.log("RazorPay Options",option)
    const razorpay = new window.Razorpay(option)

    razorpay.on('payment.failed',function(response){
        console.log("PAYMENT FAILED",response.error)
    })

    razorpay.open()
}

export default openRazorPay