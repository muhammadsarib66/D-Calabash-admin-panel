/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardBody,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import Header from "../../components/CardHeader";
const RiderStatusTab = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Disable",
    value: "disabled",
  },
];

const TableHeadings = [
  "Product",
  "Product Name",
  "Price  ",
  "Category",
  "Status",
  "Action",
];

const products = [
  {
    name: "Product 1",
    picture: "https://source.unsplash.com/random/300x200/?product",
    price: "$19.99",
    status: Math.random() < 0.5 ? "Active" : "Disabled",
    category: "Category A",
  },
  {
    name: "Product 2",
    picture: "https://source.unsplash.com/random/300x200/?product3",
    price: "$24.99",
    status: Math.random() < 0.5 ? "Active" : "Disabled",
    category: "Category B",
  },
  {
    name: "Product 3",
    picture: "https://source.unsplash.com/random/300x200/?product2",
    price: "$14.99",
    status: Math.random() < 0.5 ? "Active" : "Disabled",
    category: "Category C",
  },
  {
    name: "Product 4",
    picture: "https://source.unsplash.com/random/300x200/?product1",
    price: "$29.99",
    status: Math.random() < 0.5 ? "Active" : "Disabled",
    category: "Category A",
  },
  {
    name: "Product 5",
    picture: "https://source.unsplash.com/random/300x200/?product",
    price: "$39.99",
    status: Math.random() < 0.5 ? "Active" : "Disabled",
    category: "Category B",
  },
  // Add more products as needed
];

const index = () => {
  const [filterData, setFilterData] = useState<any>([]);
  const [statusTab, setStatusTab] = useState<any>("all");
  const [search, setSearch] = useState<any>("");

  useEffect(() => {
    const filteredData = products.filter((data: any) => {
      if (statusTab === "all") {
        return true;
      } else {
        return data.status.toLowerCase() === statusTab;
      }
    });
    setFilterData(filteredData);

    if (search.length > 0) {
      const filteredData = products.filter((data: any) => {
        return data.name.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    }
  }, [statusTab, search]);
  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Header
        heading={"Products List"}
        headingDetail="See information about  Products"
        statusTabs={RiderStatusTab}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
        BtnTitle="Add Product"
      />
      <CardBody
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className=" h-[70vh]  overflow-scroll px-0"
      >
        <table className="mt-4 w-full min-w-max table-auto  text-left">
          <thead>
            <tr className="">
              {TableHeadings?.map((head: any) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {filterData?.map(
              ({ name, price, category, status, picture }: any, index: any) => {
                const isLast = index === filterData?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <>
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={picture}
                          alt="product"
                          className="active:scale-150 duration-300 transition ease-in-out w-16 h-16"
                        />
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={status}
                            color={status === "Active" ? "green" : "red"}
                          />
                        </div>
                      </td>

                      <td className={classes}>
                        <IconButton
                          variant="text"
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          <DeleteIcon className=" text-red-500 h-4 w-4" />
                        </IconButton>
                      </td>
                    </tr>
                  </>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default index;
