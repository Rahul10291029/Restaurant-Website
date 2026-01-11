import emailjs from "emailjs-com";

export const sendReservationEmail = (data) => {
  return emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    {
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      guests: data.guests,
      special: data.special,
    },
    "YOUR_PUBLIC_KEY"
  );
};
