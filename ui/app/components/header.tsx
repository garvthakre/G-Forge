import { NextPage } from 'next'

interface Props {}

const Header: NextPage<Props> = ({}) => {
  return <div>
    <div className='bg-blue-300 flex justify-between p-4 flex-row flex'>
    <div className='bg-red-300'>Garv Thakre</div>
    <div className='bg-green-300'>Skills</div>
    <div className='bg-yellow-300'>Projects</div>
    <div className='bg-purple-300'>Experience</div>
    </div>
  </div>
}

export default Header