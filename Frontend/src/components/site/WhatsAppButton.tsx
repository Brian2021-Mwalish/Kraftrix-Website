import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/254700000000"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-accent text-accent-foreground grid place-items-center shadow-flame hover:scale-110 transition-smooth animate-float"
  >
    <MessageCircle className="h-6 w-6" />
  </a>
);

export default WhatsAppButton;
