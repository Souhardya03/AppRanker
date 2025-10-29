import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full flex items-center mt-8 justify-center'>
        <ul className='flex gap-8 text-sm text-gray-400'>
            <li><Link to={"#"}>Terms</Link></li>
            <li><Link to={"#"}>Privacy</Link></li>
            <li><Link to={"#"}>Help</Link></li>
            <li><Link to={"#"}>Send Feedback</Link></li>
        </ul>
      
    </div>
  )
}

export default Footer
