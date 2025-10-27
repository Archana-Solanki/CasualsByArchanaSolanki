import { AnimatedTestimonials } from "../Components/Testimonials";
import Neil from "../assets/Neil.jpg"
import Aditya from "../assets/Aditya.jpg"
import Rishii from "../assets/Rishii.jpg"

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Perfection is the word! Absolutely loved it! Perfect balance of comfort and creativity. Detailing, quick service, suggestions according to your choice, personality, trends and up-to-date knowledge are her plus points. The output was more beautiful than I imagined. Totally worth it!! Thank you so much!!",
      name: "Nikita Lunawat",
      src: `${Neil}`,
    },
    {
      quote:
        "Archana Solanki is an amazing fashion designer. Her work is absolutely fantastic. I really appreciate the way she puts so much of efforts in designing a dress, she made sure that I was satisfied with the dress.The stitching, designing everything turned out to be great. I was extremely happy as the dress turned out the way I wanted. Thank you so much, I really loved the dress 😊",
      name: "Harshita Jain",
      src: `${Aditya}`,
    },
    {
      quote:
        "It's is great working with fashion designer Archana Solanki mam, got her connect by Varsha kadam who suggested Archana Mam's contact. My life companion was looking to have genuine, fashionista who will help her in need for sarees and new fashioned dresses from old sarees. Archana mam did it best ,easy n durable,light to carry for travel and more. Highly Recommended..thank you Desinger Archana mam",
      name: "Dr Prasanna S Dhumal",
      src: `${Rishii}`,
    },
    {
      quote:
        "She is just fabulous! You will fall in love with her designs, attention to detail and honest suggestions. She is reasonably priced and very punctual about her deliveries. Be it anything designing an outfit from scratch, revamping, transferring she is definitely my one stop solution for fashion! I wish you all the best for your bright future Archana, keep up your good work! Thank you for making me look nice on all the special occasions🙂",
      name: "Shweta Jhamwar",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Archana is an excellent designer. Her colour combinations , styling , fitting is always up to the mark. She takes care of all the intricate details also. Not only will she give suggestions for the garment but she will also advise for other minute details like the make up , jewellery etc. Would 100% recommend her.",
      name: "Sejal Shah",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
