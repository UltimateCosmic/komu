import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
            <div className="md:col-span-2">
            <Link href="/">
              <img src="/komu.png" alt="Komu Logo" className="h-8 w-auto mb-4" />
            </Link>
            <p className="text-white/70 text-sm mb-4 max-w-md">
              Transformamos espacios de trabajo con pizarras premium diseñadas para la productividad y el estilo.
              Calidad excepcional para profesionales exigentes.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="cursor-pointer text-white/60 hover:text-white hover:bg-white/10 p-2">
              <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="cursor-pointer text-white/60 hover:text-white hover:bg-white/10 p-2">
              <Instagram className="h-4 w-4" />
              </Button>
            </div>
            </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
              <a className="text-white/70 hover:text-white transition-colors cursor-pointer">
                Productos
              </a>
              </li>
              <li>
              <a className="text-white/70 hover:text-white transition-colors cursor-pointer">
                Categorías
              </a>
              </li>
              <li>
              <a className="text-white/70 hover:text-white transition-colors cursor-pointer">
                Ofertas
              </a>
              </li>
              <li>
              <a className="text-white/70 hover:text-white transition-colors cursor-pointer">
                Sobre Nosotros
              </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-white/70">
                <Mail className="h-4 w-4" />
                <span>info@komu.com</span>
              </li>
              <li className="flex items-center space-x-2 text-white/70">
                <Phone className="h-4 w-4" />
                <span>+51 999 888 777</span>
              </li>
              <li className="flex items-center space-x-2 text-white/70">
                <MapPin className="h-4 w-4" />
                <span>Lima, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white/60">© 2025 Komu. Hecho por Johan Amador.</p>
        </div>
      </div>
    </footer>
  )
}
