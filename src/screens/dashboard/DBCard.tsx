import riders from "../../Images/bdIcons/Icon.svg";
import order from "../../Images/bdIcons/Icon (1).svg";
import sales from "../../Images/bdIcons/Icon (2).svg";
import pending from "../../Images/bdIcons/Icon (3).svg";

const DbCardsData = [{
    title : 'total User',
    record : '40,200',
    icon :riders,
    ranking : 2.4
},
{
    title : 'total orders',
    record : '36,002',
    icon : order,
    ranking : 4.05
},
{
    title : 'total sales',
    record : "$40,200",
    icon :sales,
    ranking : -1.2
},
{
    title : 'total pending',
    record : "9,877",
    icon : pending,
    ranking : -9.2
},
]
const DBCard = () => {
    
  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {
            DbCardsData.map((data,index) => (
                <div key={index} className='bg-white shadow-md  group hover:bg-blue-200 hover:scale-110 hover:shadow-2xl duration-300 transition ease-in-out p-4 rounded-lg'>
                <div className='flex items-center justify-between '>
                    <div>
                        <h4 className=' group-hover:text-white text-gray-700 text-sm capitalize '>{data.title}</h4>
                        <div className='mt-4'>
                    <h1 className='text-2xl font-semibold group-hover:text-white text-gray-800'>{data.record}</h1>
                </div>
                    </div>
                    <img src={data.icon} alt='icon' className='w-12 h-12'/>
                </div>
                <div className='mt-4'>
                        <span className=' text-sm flex gap-2' >
                              <p className={`font-semibold ${data?.ranking >0 ?"text-green-500" : "text-red-500"}`}>  2.4%</p>
                    <p className=' group-hover:text-white text-gray-800'>up from Yesterday</p>
                        </span>
                </div>
            </div>
            ))
        }
    </section>
  )
}

export default DBCard