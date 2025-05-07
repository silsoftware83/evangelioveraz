
import { Button } from '../../components/ui/Button'
import { Reply } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroSectionEdit } from '../../components/HeroSection/HeroSectionEdit'

export const HeroSectionGestion = () => {
  return (
    <div>
      <Button className="ml-2 bg-red-500" >
        <Link to={'/admin'} className='flex items-center text-white'>
          <Reply />Volver
        </Link>
      </Button>
      <div className="bg-white p-6 rounded-lg shadow-md mt-3">
        <HeroSectionEdit />
      </div>
    </div>
  )
}
