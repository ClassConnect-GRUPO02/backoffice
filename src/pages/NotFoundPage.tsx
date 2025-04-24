import { Button } from "../../@/components/ui/button"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Página no encontrada</h2>
      <p className="mt-2 text-muted-foreground">La página que estás buscando no existe o ha sido movida.</p>
      <Link to="/dashboard">
        <Button className="mt-6">Volver al Dashboard</Button>
      </Link>
    </div>
  )
}

export default NotFoundPage
