import DBCard from './DBCard'
import DBChart from './DBChart'

const index = () => {
  return (
    <section className=' p-8 flex flex-col gap-4 '>
      
      <h1 className=' text-2xl font-semibold text-gray-800'>Dashboard </h1>
      <div className='flex flex-col gap-8'>
        <DBCard />
        <DBChart />
      </div>
      </section>
  )
}

export default index