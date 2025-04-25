
import { Button } from '../../components/ui/Button'
import { Reply } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WelcomeSectionEdit } from '../../components/WelcomeSection/WelcomeSectionEdit'

export const WelcomeGestion = () => {
  return (
    <div>
      <Button className="ml-2 bg-red-500" >
        <Link to={'/admin'} className='flex items-center text-white'>
          <Reply />Volver
        </Link>
      </Button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <WelcomeSectionEdit />
      </div>
    </div>
  )
}
