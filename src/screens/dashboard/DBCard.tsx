/* eslint-disable @typescript-eslint/no-explicit-any */
import user from "../../Images/bdIcons/Icon.svg";
import order from "../../Images/bdIcons/Icon (1).svg";
import sales from "../../Images/bdIcons/Icon (2).svg";
import pending from "../../Images/bdIcons/Icon (3).svg";
import riders from "../../Images/bdIcons/BikeIcon.svg";
import categorary from "../../Images/bdIcons/CategoriesIcon.svg";
import addressIc from "../../Images/bdIcons/AddressesIcon.svg";
import { useSelector } from "react-redux";

const DBCard = () => {
  const { DashboardData } = useSelector((state: any) => state.DashboardSlicer);
  const DbCardsData = [
    {
      title: "Pending Orders",
      record:
        DashboardData?.pendingOrders?.length > 0
          ? DashboardData?.pendingOrders?.length
          : 0,
      icon: pending,
    },
    {
      title: "Active Orders",
      record:
        DashboardData?.activeOrders?.length > 0
          ? DashboardData?.activeOrders?.length
          : 0,
      icon: pending,
    },
    {
      title: "total User",
      record: DashboardData?.usersCount,
      icon: user,
    },
    {
      title: "total orders",
      record: DashboardData?.ordersCount,
      icon: order,
    },
    {
      title: "Total Products",
      record: DashboardData?.productsCount,

      icon: sales,
    },

    {
      title: "total Riders",
      record: DashboardData?.ridersCount,
      icon: riders,
    },
    {
      title: "total Categories",
      record:
        DashboardData?.categoriesCount,
      icon: categorary,
    },
    {
      title: "today's total Sales",
      record: "$"+DashboardData?.totalSales?.toFixed(2),
      icon: addressIc,
    },
  ];
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {DbCardsData.map((data, index) => (
        <div
          key={index}
        
          className="bg-white shadow-md  group hover:bg-blue-200 hover:scale-110 hover:shadow-2xl duration-300 transition ease-in-out p-4 rounded-lg"
        >
          <div className="flex items-center justify-between ">
            <div>
              <h4 className=" group-hover:text-white text-gray-700 text-sm capitalize ">
                {data.title}
              </h4>
              <div className="mt-4">
                <h1 className="text-2xl font-semibold group-hover:text-white text-gray-800">
                  {data.record}
                </h1>
              </div>
            </div>
            <img src={data.icon} alt="icon" className="w-12 h-12" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default DBCard;
