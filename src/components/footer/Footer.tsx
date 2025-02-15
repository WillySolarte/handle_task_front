
export default function Footer() {
  return (
    <footer className="py-5 bg-purple-800 h-36 flex justify-center items-center">
        <p className="text-center text-white font-bold">Todos los derechos reservados {new Date().getFullYear()}</p>
    </footer>
  )
}
